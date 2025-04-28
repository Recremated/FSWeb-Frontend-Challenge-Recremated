import { useAppContext } from "../context/AppContext";
import { contactData } from "../data";
import SocialLinks from "./SocialLinks";

function Contact() {
  const { t } = useAppContext();

  return (
    <section className="bg-[var(--contact-bg)] py-12 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6  dark:text-[#4731D3]">
          {t("getInTouch")}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {contactData.description}
        </p>

        <div className="mb-8">
          <a
            href={`mailto:${contactData.email}`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {contactData.email}
          </a>
        </div>

        <SocialLinks
          className="justify-center"
          iconSize="medium"
          variant="colorful"
        />
      </div>
    </section>
  );
}

export default Contact;
