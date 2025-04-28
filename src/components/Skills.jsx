import { useAppContext } from "../context/AppContext";
import { skillsData } from "../data";

function Skills() {
  const { t } = useAppContext();

  return (
    <section id="skills" className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t("mySkills")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((skill) => (
            <div
              key={skill.name}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-lg">{skill.name}</h3>
                <span className="text-sm">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
