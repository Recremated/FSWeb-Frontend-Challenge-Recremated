import { useAppContext } from "../context/AppContext";
import { profileData } from "../data";

function About() {
  const { t } = useAppContext();

  return (
    <section id="about" className="py-20 px-6">
      <div className="w-2/3 mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/3">
          <div className="aspect-square rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            {/* Profile image placeholder - replace with actual image */}
            <img
              src={profileData.avatar}
              alt={t("photoPlaceholder")}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("aboutMe")}
          </h2>

          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {t("aboutParagraph1")}
          </p>

          <p className="mb-6 text-gray-700 dark:text-gray-300">
            {t("aboutParagraph2")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div>
              <h3 className="font-bold text-lg mb-3">{t("personalInfo")}</h3>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">{t("email")}:</span>{" "}
                  {profileData.email}
                </li>
                <li>
                  <span className="font-medium">{t("phone")}:</span>{" "}
                  {profileData.phone}
                </li>
                <li>
                  <span className="font-medium">{t("location")}:</span>{" "}
                  {profileData.location}
                </li>
                <li>
                  <span className="font-medium">{t("languages")}:</span>{" "}
                  {profileData.languages.join(", ")}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">{t("education")}</h3>
              <ul className="space-y-2">
                {profileData.education.map((edu, index) => (
                  <li key={index}>
                    <span className="font-medium">{edu.period}:</span>{" "}
                    {t(edu.degreeKey)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href={profileData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 py-2 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {t("downloadCV")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
