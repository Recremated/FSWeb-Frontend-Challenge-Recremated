/**
 * Contact Component
 * Displays contact information, email link, and social media profiles
 * Serves as the footer section of the portfolio website
 */
import { useAppContext } from "../context/AppContext"; // Import global context for translations
import { contactData } from "../data"; // Import contact information data
import AnimatedSection from "./AnimatedSection"; // Reusable animation wrapper component
// eslint-disable-next-line
import { motion } from "framer-motion"; // Animation library for motion effects
import { useInView } from "../hooks/useInView"; // Custom hook to trigger animations when element is in viewport
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import Font Awesome component
import {
  faTwitter,
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"; // Import specific brand icons

function Contact() {
  const { t } = useAppContext(); // Get translation function from context
  const [sectionRef] = useInView({ threshold: 0.1 }); // Track when section is in view for animation

  /**
   * Function to get the correct Font Awesome icon based on the social network ID
   * Handles icon sizing and returns the proper icon for each platform
   *
   * @param {string} iconId - ID of the social media platform (twitter, instagram, etc.)
   * @returns {JSX.Element} - Font Awesome icon for the respective social platform
   */
  const getSocialIcon = (iconId) => {
    // Fixed icon size of 35px
    const iconStyle = { fontSize: "35px" };

    // Return the corresponding Font Awesome icon based on the platform ID
    switch (iconId) {
      case "twitter":
        return <FontAwesomeIcon icon={faTwitter} style={iconStyle} />;
      case "instagram":
        return <FontAwesomeIcon icon={faInstagram} style={iconStyle} />;
      case "github":
        return <FontAwesomeIcon icon={faGithub} style={iconStyle} />;
      case "linkedin":
        return <FontAwesomeIcon icon={faLinkedin} style={iconStyle} />;
      default:
        return null;
    }
  };

  return (
    <section
      className="bg-[var(--contact-bg)] py-16 md:py-20 lg:py-[84px] px-6 text-center"
      ref={sectionRef}
    >
      <div className="w-2/3 mx-auto">
        {/* Section header with animation */}
        <AnimatedSection
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7 },
            },
          }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-[var(--footer-heading-color)]">
            {t("getInTouch")} {/* Translated section title */}
          </h2>
        </AnimatedSection>

        {/* Contact description paragraph with animation */}
        <AnimatedSection
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.2, // Starts after the header animation
                duration: 0.6,
              },
            },
          }}
        >
          <p className="text-base md:text-lg lg:text-xl text-[var(--footer-text-color)] mb-8">
            {contactData.description} {/* Contact description text */}
          </p>
        </AnimatedSection>

        {/* Email link with spring animation and hover effect */}
        <AnimatedSection
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.4, // Starts after the description animation
                duration: 0.5,
                type: "spring", // Bouncy spring animation
                stiffness: 200,
              },
            },
          }}
          className="mb-8"
        >
          <motion.a
            href={`mailto:${contactData.email}`} // Email mailto link
            className="text-base md:text-lg lg:text-xl text-[var(--footer-heading-color)] hover:underline inline-block"
            whileHover={{ scale: 1.05 }} // Grow slightly on hover
            transition={{ duration: 0.2 }}
          >
            {contactData.email} {/* Display email address */}
          </motion.a>
        </AnimatedSection>

        {/* Social media links with animation */}
        <AnimatedSection
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.6, // Appears last in the sequence
                duration: 0.5,
              },
            },
          }}
        >
          {/* Social media icons */}
          <div className="flex gap-4 justify-center">
            {contactData.socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--footer-heading-color)] hover:text-[var(--profile-bg)] transition-colors"
                aria-label={social.name || social.id} // Accessibility label for screen readers
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default Contact;
