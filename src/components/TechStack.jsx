import { techStackData } from "../data";
import { useAppContext } from "../context/AppContext";
import AnimatedSection from "./AnimatedSection";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

function TechStack() {
  const { t } = useAppContext();
  const [headerRef, headerInView] = useInView({ threshold: 0.1 });

  // Split technologies into two columns with balanced distribution
  const midPoint = Math.ceil(techStackData.length / 2);
  const firstColumnTechs = techStackData.slice(0, midPoint);
  const secondColumnTechs = techStackData.slice(midPoint);

  return (
    <div className="py-16 md:py-20 lg:py-[84px]">
      <div className="w-2/3 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First column - Skills header */}
          <motion.div
            ref={headerRef}
            className="flex"
            initial={{ opacity: 0, y: 20 }}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--tech-heading-color)]">
              {t("skills")}
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
                      delay: index * 0.1,
                      duration: 0.5,
                    },
                  },
                }}
                inViewOptions={{ threshold: 0.2 }}
              >
                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                  <motion.div
                    className="w-24 h-24 md:w-20 md:h-20 lg:w-[120px] lg:h-[120px] rounded flex items-center justify-center"
                    style={{ backgroundColor: tech.bgColor }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={tech.iconUrl}
                      alt={tech.name}
                      className="w-16 h-16 md:w-14 md:h-14 lg:w-16 lg:h-16"
                    />
                  </motion.div>
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
                      delay: index * 0.1 + 0.2,
                      duration: 0.5,
                    },
                  },
                }}
                inViewOptions={{ threshold: 0.2 }}
              >
                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                  <motion.div
                    className="w-24 h-24 md:w-20 md:h-20 lg:w-[120px] lg:h-[120px] rounded flex items-center justify-center"
                    style={{ backgroundColor: tech.bgColor }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={tech.iconUrl}
                      alt={tech.name}
                      className="w-16 h-16 md:w-14 md:h-14 lg:w-16 lg:h-16"
                    />
                  </motion.div>
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
