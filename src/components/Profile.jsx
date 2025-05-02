import { profileData } from "../data";
import { useAppContext } from "../context/AppContext";
import AnimatedSection from "./AnimatedSection";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

function Profile() {
  const { t } = useAppContext();
  const [headerRef, headerInView] = useInView({ threshold: 0.1 });

  return (
    <section className="bg-[var(--profile-bg)] text-white py-16 md:py-20 lg:py-[84px] px-6">
      <div className="w-2/3 mx-auto">
        <motion.h2
          ref={headerRef}
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-[var(--heading-color)]"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {t("profile")}
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-10">
          <AnimatedSection
            className="w-full md:w-1/2"
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

            <table className="w-full text-left">
              <tbody>
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
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                  >
                    <td className="py-2 pr-4 text-base md:text-lg text-[var(--heading-color)] align-top">
                      {t(key)}
                    </td>
                    <td className="py-2 text-base md:text-lg font-medium">
                      {value}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </AnimatedSection>

          <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-8">
            <AnimatedSection
              className="w-full md:w-1/3"
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
              <motion.img
                src={profileData.avatar}
                alt="Profile"
                className="w-full h-auto rounded-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatedSection>

            <AnimatedSection
              className="w-full md:w-2/3"
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
                {t("profileAboutParagraph1")}
              </p>
              <p className="text-base md:text-lg lg:text-xl">
                {t("profileAboutParagraph2")}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
