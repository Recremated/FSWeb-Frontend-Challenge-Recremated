import { useState, useEffect, useRef } from "react";

/**
 * Custom hook that uses Intersection Observer to track when an element is in view
 * Intersection Observer is a browser API that provides an efficient way to observe
 * visibility changes of elements without causing performance issues that can occur
 * with scroll event listeners.
 *
 * Use cases in this application:
 * - Triggering animations when elements scroll into view
 * - Lazy loading images or components when they become visible
 * - Implementing infinite scroll by detecting when the user reaches the bottom
 * - Creating scroll-triggered UI effects with better performance
 *
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1) that determines how much of the element must be visible
 * @param {string} options.rootMargin - Margin around the root element (viewport by default)
 * @returns {Array} - [ref, isInView] - Element ref to attach to a DOM element and boolean indicating if element is in view
 */
export function useInView({ threshold = 0.1, rootMargin = "0px" } = {}) {
  // State to track if the element is in the viewport
  // This will be true when the element is visible according to threshold
  const [isInView, setIsInView] = useState(false);

  // Reference to the DOM element we want to observe
  // This ref needs to be attached to a component using the ref={ref} prop
  const ref = useRef(null);

  useEffect(() => {
    // Create a new Intersection Observer instance
    // This API allows us to asynchronously observe changes in the intersection
    // of a target element with an ancestor element or with the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        // entry.isIntersecting becomes true when element enters viewport
        // according to the threshold and rootMargin options
        setIsInView(entry.isIntersecting);

        // The entry object also contains other useful information such as:
        // - entry.intersectionRatio: The percentage of the element that is visible
        // - entry.boundingClientRect: The element's bounding rectangle
        // - entry.time: The time when the intersection occurred
      },
      {
        threshold, // What percentage of the element is in view (0.1 = 10%)
        // A value of 0 means "as soon as even one pixel is visible"
        // A value of 1.0 means "the entire element must be visible"
        // Can also be an array like [0, 0.5, 1] to trigger at multiple thresholds

        rootMargin, // Margin around the root. Can be used to trigger "in view" earlier/later
        // Format is similar to CSS margin: "10px 20px 30px 40px" (top, right, bottom, left)
        // Positive values expand the root element's bounding box
        // Negative values shrink the root element's bounding box

        // Note: root option is not used here, so viewport is the default root
        // This could be set to any ancestor element if needed
      }
    );

    // Get the current element from the ref
    const currentElement = ref.current;

    // Start observing the element if it exists in the DOM
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup function that runs when component unmounts
    // or when dependencies change - prevents memory leaks
    // This is crucial for preventing memory leaks and zombie observers
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      // Alternative approach: observer.disconnect() would stop observing all targets
    };
  }, [threshold, rootMargin]); // Recreate observer if these values change

  // Return both the ref to attach to a DOM element and the inView state
  // Usage example: const [elementRef, isElementVisible] = useInView({ threshold: 0.5 });
  return [ref, isInView];
}
