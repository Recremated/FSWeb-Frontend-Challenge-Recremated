import { useAppContext } from "../context/AppContext";
import { contactData } from "../data";
import SocialLinks from "./SocialLinks";

function Contact() {
  const { t } = useAppContext();

  return (
    <section className="bg-[var(--contact-bg)] py-12 px-6 text-center">
      <div className="w-2/3 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--footer-heading-color)]">
          {t("getInTouch")}
        </h2>

        <p className="text-[var(--footer-text-color)] mb-8">
          {contactData.description}
        </p>

        <div className="mb-8">
          <a
            href={`mailto:${contactData.email}`}
            className="text-[var(--footer-heading-color)] hover:underline"
          >
            {contactData.email}
          </a>
        </div>

        <SocialLinks
          className="justify-center "
          iconSize="medium"
          variant="colorful"
        />
      </div>
    </section>
  );
}

export default Contact;
