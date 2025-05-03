/**
 * AnimatedSection Component
 *
 * A reusable component that adds scroll-triggered animations to any content
 * Leverages Framer Motion for animation capabilities and Intersection Observer for performance
 *
 * Benefits of this approach:
 * - Improved performance compared to scroll listeners by using Intersection Observer
 * - Centralized animation logic to maintain consistency across the app
 * - Declarative API with customizable animation variants
 * - Progressive enhancement - content is still accessible even if JS is disabled
 */

// Import Framer Motion for animations
// eslint-disable-next-line
import { motion } from "framer-motion";
// Import custom hook to detect when elements come into view
import { useInView } from "../hooks/useInView";

/**
 * A wrapper component that animates its children when they come into view
 * Uses the Intersection Observer API through the useInView hook to trigger animations
 * This pattern follows the "render props" and "composition" React patterns
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to be animated
 * @param {Object} props.variants - Framer Motion animation variants object defining states and transitions
 * @param {string} props.className - Additional CSS classes to apply to the container
 * @param {Object} props.inViewOptions - Options for the useInView hook (threshold and rootMargin)
 * @param {Object} props.motionProps - Additional props to pass to motion.div (e.g., layout, transition)
 */
function AnimatedSection({
  children,
  variants = defaultVariants, // Use default animation if none provided
  className = "",
  inViewOptions = { threshold: 0.1, rootMargin: "-50px 0px" }, // Default threshold for triggering animations
  motionProps = {}, // Additional motion props
}) {
  // Get reference to container and whether it's in view using our custom hook
  // This uses Intersection Observer under the hood for better performance
  // The animation will trigger when the element enters the viewport
  const [ref, isInView] = useInView(inViewOptions);

  return (
    <motion.div
      ref={ref} // Attach ref to element for Intersection Observer tracking
      initial="hidden" // Initial animation state (invisible) - mapped to variants.hidden
      animate={isInView ? "visible" : "hidden"} // Switch states based on visibility
      variants={variants} // Animation variants to use (states and transitions)
      className={className} // Any additional CSS classes
      {...motionProps} // Spread any additional motion props like layout, transition overrides, etc.
    >
      {children}
    </motion.div>
  );
}

/**
 * Default animation variants for sliding up and fading in
 * This creates a subtle and professional animation effect
 *
 * The animation sequence:
 * 1. Elements start 50px below their final position and fully transparent
 * 2. When in view, they move up to their proper position while fading in
 * 3. The easeOut timing function creates a natural, decelerating motion
 *
 * Variants are a Framer Motion concept that define named animation states
 * and the transitions between them - allowing for declarative animations
 */
const defaultVariants = {
  hidden: {
    opacity: 0, // Start completely transparent
    y: 50, // Start 50px below final position
  },
  visible: {
    opacity: 1, // Fade in to full opacity
    y: 0, // Move to final position
    transition: {
      duration: 0.6, // Animation duration in seconds (600ms)
      ease: "easeOut", // Easing function - slows down toward end for natural motion
    },
  },
};

export default AnimatedSection;
