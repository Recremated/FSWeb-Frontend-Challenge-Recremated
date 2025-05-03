/**
 * Projects Component
 * Displays the user's portfolio projects with images, descriptions, and links
 * Each project includes details about technologies used and links to live sites and GitHub
 * Implements responsive design and scroll-triggered animations for visual appeal
 */
import { useAppContext } from "../context/AppContext";
import { projectsData } from "../data";
import AnimatedSection from "./AnimatedSection";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

/**
 * Projects component - Portfolio project showcase section
 * Displays a grid of project cards with images, descriptions, and links
 * Implements scroll-based animations using Framer Motion and the InView hook
 */
function Projects() {
  const { t } = useAppContext();
  const [headerRef, headerInView] = useInView({ threshold: 0.1 });

  return (
    <section className="bg-[var(--projects-bg)] py-16 md:py-20 lg:py-[84px] px-6">
      <div className="w-2/3 mx-auto">
        {/* Section header with fade-in animation when scrolled into view */}
        <motion.h2
          ref={headerRef}
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-[var(--tech-heading-color)]"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {t("projects")}
        </motion.h2>

        {/* 
          Project list - only shows first 3 projects from data
          This limits the displayed projects to maintain page performance
          Each project card animates into view with staggered timing
        */}
        {projectsData.slice(0, 3).map((project, index) => (
          <AnimatedSection
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: index * 0.2,
                  duration: 0.6,
                },
              },
            }}
            className="mb-10"
          >
            {/* Project card with hover animation effect */}
            <motion.div
              className="bg-white dark:bg-[var(--card-bg)] rounded-lg shadow-md overflow-hidden"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Responsive layout - switches from column to row at medium breakpoint */}
              <div className="flex flex-col md:flex-row">
                {/* Project image container - full width on mobile, 1/3 width on desktop */}
                <div className="w-full md:w-1/3">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Project details container - full width on mobile, 2/3 width on desktop */}
                <div className="w-full md:w-2/3 px-12 py-20">
                  {/* Project title with responsive font sizing */}
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 text-[var(--projects-heading-color)]">
                    {project.name}
                  </h3>
                  {/* Project description - uses translation keys for localization */}
                  <p className="text-base md:text-lg lg:text-xl text-[var(--projects-text-color)] mb-4">
                    {t(project.descriptionKey)}
                  </p>

                  {/* Technology tags container with wrapping for responsive layout */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {/* Map through technologies used in the project */}
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        className="tech-tag px-3 py-1 rounded text-xs md:text-sm font-semibold"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 + 0.3 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Project links container with responsive font sizing */}
                  <div className="text-sm md:text-base lg:text-lg font-medium">
                    {/* Link to live site with hover animation */}
                    <motion.a
                      href={project.liveUrl}
                      className="hover:underline text-[var(--projects-link-color)]"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      View Site
                    </motion.a>
                    <span className="mx-2 dark:text-gray-300">•</span>
                    {/* Link to GitHub repository with hover animation */}
                    <motion.a
                      href={project.githubUrl}
                      className="hover:underline text-[var(--projects-link-color)]"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      GitHub
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

export default Projects;
