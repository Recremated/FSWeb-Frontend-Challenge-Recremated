// eslint-disable-next-line
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

/**
 * A wrapper component that animates its children when they come into view
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
  variants = defaultVariants,
  className = "",
  inViewOptions = { threshold: 0.1, rootMargin: "-50px 0px" },
  motionProps = {},
}) {
  const [ref, isInView] = useInView(inViewOptions);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

// Default animation variants
const defaultVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default AnimatedSection;
