import { profileData } from "../data";
import { useAppContext } from "../context/AppContext";

function Profile() {
  const { t } = useAppContext();

  return (
    <section className="bg-indigo-700 text-white py-16 px-6">
      <div className="w-2/3 mx-auto">
        <h2 className="text-4xl font-bold mb-12">{t("profile")}</h2>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-semibold mb-6">
              {t("basicInformation")}
            </h3>

            <table className="w-full text-left">
              <tbody>
                <tr>
                  <td className="py-2 pr-4 text-yellow-300 align-top">
                    {t("birthDate")}
                  </td>
                  <td className="py-2 font-medium">{profileData.birthDate}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-yellow-300 align-top">
                    {t("residenceCity")}
                  </td>
                  <td className="py-2 font-medium">{profileData.city}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-yellow-300 align-top">
                    {t("educationStatus")}
                  </td>
                  <td className="py-2 font-medium">
                    {profileData.education.university}
                    <br />
                    {profileData.education.degree}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-yellow-300 align-top">
                    {t("preferredRole")}
                  </td>
                  <td className="py-2 font-medium">
                    {profileData.preferredRole}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-full h-auto rounded-md"
              />
            </div>

            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-semibold mb-4">{t("aboutMe")}</h3>
              <p className="mb-4">{t("profileAboutParagraph1")}</p>
              <p>{t("profileAboutParagraph2")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
