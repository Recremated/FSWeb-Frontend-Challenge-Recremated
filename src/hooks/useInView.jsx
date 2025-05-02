import { useState, useEffect, useRef } from "react";

/**
 * Custom hook that uses Intersection Observer to track when an element is in view
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Margin around the root
 * @returns {Array} - [ref, isInView] - Element ref and boolean indicating if element is in view
 */
export function useInView({ threshold = 0.1, rootMargin = "0px" } = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup function
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin]);

  return [ref, isInView];
}
