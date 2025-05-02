import { useAppContext } from "../context/AppContext";
import { contactData } from "../data";
import SocialLinks from "./SocialLinks";
import AnimatedSection from "./AnimatedSection";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

function Contact() {
  const { t } = useAppContext();
  const [sectionRef] = useInView({ threshold: 0.1 });

  return (
    <section
      className="bg-[var(--contact-bg)] py-16 md:py-20 lg:py-[84px] px-6 text-center"
      ref={sectionRef}
    >
      <div className="w-2/3 mx-auto">
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
            {t("getInTouch")}
          </h2>
        </AnimatedSection>

        <AnimatedSection
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.2,
                duration: 0.6,
              },
            },
          }}
        >
          <p className="text-base md:text-lg lg:text-xl text-[var(--footer-text-color)] mb-8">
            {contactData.description}
          </p>
        </AnimatedSection>

        <AnimatedSection
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.4,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              },
            },
          }}
          className="mb-8"
        >
          <motion.a
            href={`mailto:${contactData.email}`}
            className="text-base md:text-lg lg:text-xl text-[var(--footer-heading-color)] hover:underline inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {contactData.email}
          </motion.a>
        </AnimatedSection>

        <AnimatedSection
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.6,
                duration: 0.5,
              },
            },
          }}
        >
          <SocialLinks
            className="justify-center"
            iconSize="medium"
            variant="colorful"
          />
        </AnimatedSection>
      </div>
    </section>
  );
}

export default Contact;
