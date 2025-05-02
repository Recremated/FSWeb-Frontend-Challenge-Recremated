/**
 * TechStack Component
 * Displays the user's technical skills and proficiencies in a visually appealing grid
 * Each technology is shown with its icon and name in a responsive layout
 */
import { techStackData } from "../data"; // Import technology skills data
import { useAppContext } from "../context/AppContext"; // Import global context for translations
import AnimatedSection from "./AnimatedSection"; // Reusable animation wrapper component
// eslint-disable-next-line
import { motion } from "framer-motion"; // Animation library for motion effects
import { useInView } from "../hooks/useInView"; // Custom hook to trigger animations when element is in viewport

function TechStack() {
  const { t } = useAppContext(); // Get translation function from context
  const [headerRef, headerInView] = useInView({ threshold: 0.1 }); // Track when header is in view for animation

  // Split technologies into two columns with balanced distribution
  const midPoint = Math.ceil(techStackData.length / 2);
  const firstColumnTechs = techStackData.slice(0, midPoint); // First half of technologies for left column
  const secondColumnTechs = techStackData.slice(midPoint); // Second half of technologies for right column

  return (
    <div className="py-16 md:py-20 lg:py-[84px]">
      <div className="w-2/3 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First column - Skills header */}
          <motion.div
            ref={headerRef}
            className="flex"
            initial={{ opacity: 0, y: 20 }} // Start invisible and below final position
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            } // Animate in when in view
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--tech-heading-color)]">
              {t("skills")} {/* Translated section title */}
            </h2>
          </motion.div>

          {/* Second column - First half of technologies */}
          <div className="flex flex-col gap-8">
            {firstColumnTechs.map((tech, index) => (
              <AnimatedSection
                key={tech.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.1, // Staggered animation with increasing delay
                      duration: 0.5,
                    },
                  },
                }}
                inViewOptions={{ threshold: 0.2 }} // Animation starts when 20% of the element is visible
              >
                {/* Technology item with icon and name */}
                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                  {/* Colored icon container with hover animation */}
                  <motion.div
                    className="w-24 h-24 md:w-20 md:h-20 lg:w-[120px] lg:h-[120px] rounded flex items-center justify-center"
                    style={{ backgroundColor: tech.bgColor }} // Dynamic background color from data
                    whileHover={{ scale: 1.05 }} // Grow slightly on hover
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Technology icon */}
                    <img
                      src={tech.iconUrl}
                      alt={tech.name}
                      className="w-16 h-16 md:w-14 md:h-14 lg:w-16 lg:h-16"
                    />
                  </motion.div>
                  {/* Technology name */}
                  <span className="text-base md:text-xl lg:text-[24px] font-medium uppercase text-[var(--text-tech)]">
                    {tech.name}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Third column - Second half of technologies */}
          <div className="flex flex-col gap-8">
            {secondColumnTechs.map((tech, index) => (
              <AnimatedSection
                key={tech.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.1 + 0.2, // Staggered animation with slight extra delay compared to first column
                      duration: 0.5,
                    },
                  },
                }}
                inViewOptions={{ threshold: 0.2 }} // Animation starts when 20% of the element is visible
              >
                {/* Technology item with icon and name (same structure as first column) */}
                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                  {/* Colored icon container with hover animation */}
                  <motion.div
                    className="w-24 h-24 md:w-20 md:h-20 lg:w-[120px] lg:h-[120px] rounded flex items-center justify-center"
                    style={{ backgroundColor: tech.bgColor }} // Dynamic background color from data
                    whileHover={{ scale: 1.05 }} // Grow slightly on hover
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Technology icon */}
                    <img
                      src={tech.iconUrl}
                      alt={tech.name}
                      className="w-16 h-16 md:w-14 md:h-14 lg:w-16 lg:h-16"
                    />
                  </motion.div>
                  {/* Technology name */}
                  <span className="text-base md:text-xl lg:text-[24px] font-medium uppercase text-[var(--text-tech)]">
                    {tech.name}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechStack;
