// Import Framer Motion for animations
// eslint-disable-next-line
import { motion } from "framer-motion";
// Import custom hook to detect when elements come into view
import { useInView } from "../hooks/useInView";

/**
 * A wrapper component that animates its children when they come into view
 * Uses the Intersection Observer API through the useInView hook to trigger animations
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to be animated
 * @param {Object} props.variants - Framer Motion animation variants
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.inViewOptions - Options for the useInView hook
 * @param {Object} props.motionProps - Additional props to pass to motion.div
 */
function AnimatedSection({
  children,
  variants = defaultVariants, // Use default animation if none provided
  className = "",
  inViewOptions = { threshold: 0.1, rootMargin: "-50px 0px" }, // Default threshold for triggering animations
  motionProps = {}, // Additional motion props
}) {
  // Get reference to container and whether it's in view
  const [ref, isInView] = useInView(inViewOptions);

  return (
    <motion.div
      ref={ref} // Attach ref to element for Intersection Observer
      initial="hidden" // Initial animation state (invisible)
      animate={isInView ? "visible" : "hidden"} // Animate when in view
      variants={variants} // Animation variants to use
      className={className} // Any additional CSS classes
      {...motionProps} // Spread any additional motion props
    >
      {children}
    </motion.div>
  );
}

// Default animation variants for sliding up and fading in
const defaultVariants = {
  hidden: {
    opacity: 0, // Start completely transparent
    y: 50, // Start 50px below final position
  },
  visible: {
    opacity: 1, // Fade in to full opacity
    y: 0, // Move to final position
    transition: {
      duration: 0.6, // Animation duration in seconds
      ease: "easeOut", // Easing function - slows down toward end
    },
  },
};

export default AnimatedSection;
