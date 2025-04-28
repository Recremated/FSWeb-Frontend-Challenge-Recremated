import { useAppContext } from "../context/AppContext";
import { profileData } from "../data";

function Profile() {
  const { t } = useAppContext();

  return (
    <section className="bg-[var(--profile-bg)] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">{t("about")}</h2>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">{t("personalInfo")}</h3>

            <table className="w-full text-left">
              <tbody>
                <tr>
                  <td className="py-2 pr-4 text-gray-300 align-top">
                    {t("title")}:
                  </td>
                  <td className="py-2 font-medium">{profileData.title}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-gray-300 align-top">
                    {t("languages")}:
                  </td>
                  <td className="py-2 font-medium">
                    {profileData.languages.join(", ")}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-gray-300 align-top">
                    Recent Sector:
                  </td>
                  <td className="py-2 font-medium">
                    {profileData.recentSector}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-gray-300 align-top">
                    Twitter/GitHub:
                  </td>
                  <td className="py-2 font-medium">
                    {profileData.socialHandles.twitter}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <img
                src={profileData.avatar}
                alt={t("photoPlaceholder")}
                className="w-full aspect-square object-cover rounded-xl"
              />
            </div>

            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-semibold mb-4">{t("aboutMe")}</h3>
              <p className="mb-3">{t("aboutParagraph1")}</p>
              <p>{t("aboutParagraph2")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
