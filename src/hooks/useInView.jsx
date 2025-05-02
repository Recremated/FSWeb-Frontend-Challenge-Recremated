import { useState, useEffect, useRef } from "react";

/**
 * Custom hook that uses Intersection Observer to track when an element is in view
 * This hook simplifies using the Intersection Observer API in React components
 *
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1) that determines how much of the element must be visible
 * @param {string} options.rootMargin - Margin around the root element (viewport by default)
 * @returns {Array} - [ref, isInView] - Element ref to attach to a DOM element and boolean indicating if element is in view
 */
export function useInView({ threshold = 0.1, rootMargin = "0px" } = {}) {
  // State to track if the element is in the viewport
  const [isInView, setIsInView] = useState(false);

  // Reference to the DOM element we want to observe
  const ref = useRef(null);

  useEffect(() => {
    // Create a new Intersection Observer instance
    // This API allows us to asynchronously observe changes in the intersection
    // of a target element with an ancestor element or with the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        // entry.isIntersecting becomes true when element enters viewport
        setIsInView(entry.isIntersecting);
      },
      {
        threshold, // What percentage of the element is in view (0.1 = 10%)
        rootMargin, // Margin around the root. Can be used to trigger "in view" earlier/later
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
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin]); // Recreate observer if these values change

  // Return both the ref to attach to a DOM element and the inView state
  return [ref, isInView];
}
