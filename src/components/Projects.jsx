import { useAppContext } from "../context/AppContext";
import { projectsData } from "../data";

function Projects() {
  const { t } = useAppContext();

  return (
    <section className="bg-[var(--projects-bg)] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-12">
          {t("projects")}
        </h2>

        {projectsData.slice(0, 2).map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-[var(--card-bg)] rounded-lg shadow-md overflow-hidden mb-10"
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-2/3 p-6">
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t(project.descriptionKey)}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="project-btn demo">{t("liveDemo")}</span>
                  <span className="project-btn code">{t("viewCode")}</span>
                  <span className="project-btn more">More</span>
                </div>

                <div className="text-sm font-medium">
                  <a
                    href={project.liveUrl}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Site
                  </a>
                  <span className="mx-2 dark:text-gray-300">•</span>
                  <a
                    href={project.githubUrl}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
