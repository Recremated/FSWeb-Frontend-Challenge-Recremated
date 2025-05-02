/**
 * Hero component - The landing section of the portfolio website
 * Features a split-screen design with profile information, language selector, and theme toggle
 * Uses animations for a modern, engaging user experience
 */
import { useAppContext } from "../context/AppContext"; // Import global context for translations and theme
import ThemeSelector from "./ThemeSelector"; // Component for theme selection (light/dark/auto)
// eslint-disable-next-line
import { motion } from "framer-motion"; // Animation library for UI motion effects
import AnimatedSection from "./AnimatedSection"; // Component for section animations

function Hero() {
  // Extract required functions and state from global context
  const { language, t, changeLanguage } = useAppContext();

  // Animation variants for staggered animations of text elements
  // These define how child elements will animate in sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between child animations (200ms)
        delayChildren: 0.1, // Initial delay before starting children animations (100ms)
      },
    },
  };

  // Animation properties for individual elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start invisible and 20px below final position
    visible: {
      opacity: 1, // Fade in to full opacity
      y: 0, // Move up to final position
      transition: {
        duration: 0.6, // Animation duration (600ms)
        ease: "easeOut", // Easing function - slows down toward end
      },
    },
  };

  // Button hover animation properties
  const buttonHoverVariants = {
    hover: {
      scale: 1.05, // Grow slightly on hover (5% larger)
      backgroundColor: "#ffffff",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)", // Add subtle shadow on hover
    },
  };

  return (
    <section className="flex flex-col lg:flex-row relative">
      {/* Mobile navigation - visible only on small and medium screens */}
      {/* Position fixed at top-right corner on mobile */}
      <motion.div
        className="absolute top-6 right-6 z-30 flex items-center gap-4 lg:hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Language toggle button for mobile/tablet */}
        <motion.button
          onClick={() =>
            language === "en" ? changeLanguage("tr") : changeLanguage("en")
          }
          className="uppercase text-xs md:text-sm font-bold tracking-wide text-lime-400 hover:text-lime-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {language === "en" ? "TR" : "EN"}
        </motion.button>
        <ThemeSelector size="small" />{" "}
        {/* Theme toggle for mobile/tablet - smaller size */}
      </motion.div>

      {/* Left side - colored background with text content */}
      {/* Takes 70% width on desktop, full width on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-7/10 bg-[var(--profile-bg)] text-white p-10 py-16 md:py-20 lg:py-[84px] md:p-16 lg:p-20 flex flex-col justify-center min-h-[50vh] lg:min-h-[60vh] relative"
      >
        {/* Language selector positioned at the top right of background - desktop only */}
        <motion.div
          className="absolute top-6 right-6 z-20 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Language toggle button for desktop */}
          <motion.button
            onClick={() =>
              language === "en" ? changeLanguage("tr") : changeLanguage("en")
            }
            className="uppercase text-xs md:text-sm lg:text-base font-bold tracking-wide text-lime-400 hover:text-lime-300 transition-colors"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {t("changeLanguage")}{" "}
            {/* Uses translation key for language toggle text */}
          </motion.button>
        </motion.div>

        {/* Main content container with staggered animation */}
        {/* Centered with width constraints */}
        <motion.div
          className="w-2/3 mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Name/brand text */}
          <motion.div
            variants={itemVariants}
            className="text-[var(--heading-color)] text-xl md:text-2xl lg:text-[32px] font-medium mb-15"
          >
            almila
          </motion.div>

          {/* Animated heading with job title */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-[54px] font-bold mb-6 text-[var(--heading-color)]"
          >
            {language === "en" ? "I am a " : "Ben bir "}
            {/* Pulsing animation for the first word of the title */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                repeat: Infinity, // Makes animation repeat forever
                repeatType: "reverse", // Ping-pong effect (fade in, fade out)
              }}
            >
              {/* Split the title by space and get first word */}
              {t("title").split(" ")[0]}
            </motion.span>
            <br />
            {/* Second part of the title with appropriate language suffix */}
            {t("title").split(" ")[1] + (language === "en" ? "..." : "yim...")}
          </motion.h1>

          {/* Introduction paragraph */}
          <motion.p
            variants={itemVariants}
            className="mb-10 text-base md:text-lg lg:text-[24px] text-white"
          >
            {t("intro")}
          </motion.p>

          {/* Social media links container with horizontal layout */}
          <motion.div variants={itemVariants} className="flex gap-4">
            {/* GitHub link button with icon */}
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-[var(--profile-bg)] p-[12px] rounded-[6px] font-medium hover:bg-gray-100 transition-colors text-base md:text-lg lg:text-[18px]"
              whileHover={buttonHoverVariants.hover}
              whileTap={{ scale: 0.95 }} // Slight press effect on click
              transition={{ duration: 0.2 }}
            >
              {/* GitHub SVG icon */}
              <svg
                className="w-5 h-5 md:w-6 md:h-6 lg:w-[26px] lg:h-[26px]"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Github
            </motion.a>

            {/* LinkedIn link button with icon */}
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-[var(--profile-bg)] p-[12px] rounded-[6px] font-medium hover:bg-gray-100 transition-colors text-base md:text-lg lg:text-[18px]"
              whileHover={buttonHoverVariants.hover}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* LinkedIn SVG icon */}
              <svg
                className="w-5 h-5 md:w-6 md:h-6 lg:w-[26px] lg:h-[26px]"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right side - second color background */}
      {/* Takes 30% width on desktop, full width on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-3/10 bg-[var(--projects-bg)] flex items-center justify-center min-h-[50vh] lg:min-h-[60vh] relative"
      >
        {/* Theme selector positioned at the top left of background - desktop only */}
        <motion.div
          className="absolute top-6 left-6 z-20 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ThemeSelector size="medium" />{" "}
          {/* Theme toggle for desktop - medium size */}
        </motion.div>

        {/* Profile image for mobile and tablet - centered in green background */}
        {/* Only visible on mobile and tablet screens */}
        <motion.div
          className="lg:hidden border-8 border-white rounded-2xl shadow-xl overflow-hidden my-16 md:my-20 lg:my-[84px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.03 }}
        >
          <img
            src="https://via.placeholder.com/400x500?text=Developer"
            alt={t("photoPlaceholder")}
            className="w-64 h-80 object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Profile image positioned at the intersection of the two backgrounds - desktop only */}
      {/* Positioned absolutely to overlap the two background sections */}
      <motion.div
        className="absolute top-1/2 left-[70%] transform -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          type: "spring", // Spring physics for more natural motion
          stiffness: 100, // Spring stiffness - higher values = faster/bouncier
        }}
        whileHover={{ scale: 1.05, rotate: 1, transition: { duration: 0.3 } }}
      >
        {/* Profile image with white border and shadow */}
        <div className="border-8 border-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src="https://via.placeholder.com/400x500?text=Developer"
            alt={t("photoPlaceholder")}
            className="w-72 h-96 object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
