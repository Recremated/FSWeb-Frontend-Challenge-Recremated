/**
 * Profile Component
 * Displays the user's personal information, education, and professional details
 * Features a responsive layout with animated sections
 */
import { profileData } from "../data"; // Import profile data (education, personal info, etc.)
import { useAppContext } from "../context/AppContext"; // Import global context for translations
import AnimatedSection from "./AnimatedSection"; // Reusable animation wrapper component
// eslint-disable-next-line
import { motion } from "framer-motion"; // Animation library for motion effects
import { useInView } from "../hooks/useInView"; // Custom hook to trigger animations when element is in viewport

function Profile() {
  const { t } = useAppContext(); // Get translation function from context
  const [headerRef, headerInView] = useInView({ threshold: 0.1 }); // Track when header is in view for animation

  return (
    <section className="bg-[var(--profile-bg)] text-white py-16 md:py-20 lg:py-[84px] px-6">
      <div className="w-2/3 mx-auto">
        {/* Section header with animation */}
        <motion.h2
          ref={headerRef}
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-[var(--heading-color)]"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {t("profile")}
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Basic information table section */}
          <AnimatedSection
            className="w-full lg:w-1/3"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6 },
              },
            }}
          >
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-white">
              {t("basicInformation")}
            </h3>

            {/* Information table with key-value pairs */}
            <table className="w-full text-left">
              <tbody>
                {/* Map through profile data to create table rows */}
                {Object.entries({
                  birthDate: profileData.birthDate,
                  residenceCity: profileData.city,
                  educationStatus: (
                    <>
                      {profileData.education.university}
                      <br />
                      {profileData.education.degree}
                    </>
                  ),
                  preferredRole: profileData.preferredRole,
                }).map(([key, value], index) => (
                  <motion.tr
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }} // Staggered animation for rows
                  >
                    <td className="py-2 pr-4 text-base md:text-lg text-[var(--heading-color)] align-top">
                      {t(key)} {/* Translated property name */}
                    </td>
                    <td className="py-2 text-base md:text-lg font-medium">
                      {value} {/* Property value */}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </AnimatedSection>

          {/* Profile image section */}
          <AnimatedSection
            className="w-full lg:w-1/3"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  delay: 0.2,
                  duration: 0.5,
                },
              },
            }}
          >
            <motion.div className="flex items-center justify-center h-full">
              <motion.img
                src={profileData.avatar}
                alt="Profile"
                width={300}
                height={290}
                style={{
                  maxWidth: "300px",
                  height: "auto",
                  aspectRatio: "300/290",
                  objectFit: "cover",
                  borderRadius: "0.375rem", // equivalent to rounded-md
                }}
                whileHover={{ scale: 1.05 }} // Grow slightly on hover
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </AnimatedSection>

          {/* About Me text section with animation */}
          <AnimatedSection
            className="w-full lg:w-1/3"
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.3,
                  duration: 0.6,
                },
              },
            }}
          >
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
              {t("aboutMe")}
            </h3>
            <p className="text-base md:text-lg lg:text-xl mb-4">
              {t("profileAboutParagraph1")} {/* First paragraph about user */}
            </p>
            <p className="text-base md:text-lg lg:text-xl">
              {t("profileAboutParagraph2")} {/* Second paragraph about user */}
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default Profile;
