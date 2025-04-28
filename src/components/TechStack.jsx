import { techStackData } from "../data";

function TechStack() {
  const renderTechIcon = (tech) => {
    if (tech.figmaIcon) {
      return (
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
          <path
            d="M8.5 2a6.5 6.5 0 0 0 0 13v-2.13a4.37 4.37 0 0 1 0-8.74V2z"
            fill="#1ABCFE"
          />
          <path d="M8.5 4.37a4.37 4.37 0 0 0 0 8.74V4.37z" fill="#0ACF83" />
          <path
            d="M15 4.37a4.37 4.37 0 1 1-8.74 0A4.37 4.37 0 0 1 15 4.37z"
            fill="#FF7262"
          />
          <path
            d="M19.73 8.5a4.37 4.37 0 0 1-4.37 4.37 4.37 4.37 0 0 1-4.36-4.37 4.37 4.37 0 0 1 4.36-4.37 4.37 4.37 0 0 1 4.37 4.37z"
            fill="#F24E1E"
          />
          <path d="M15.36 12.87a4.37 4.37 0 0 0 0 8.74V12.87z" fill="#FF7262" />
          <path
            d="M15.36 21.61a4.37 4.37 0 0 0 4.37-4.37 4.37 4.37 0 0 0-4.37-4.37v8.74z"
            fill="#1ABCFE"
          />
        </svg>
      );
    }

    return (
      <svg
        viewBox="0 0 24 24"
        className={`w-10 h-10 ${tech.textColor}`}
        fill="currentColor"
      >
        <path d={tech.iconPath} />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center mx-auto max-w-5xl px-6">
      {techStackData.map((tech) => (
        <div key={tech.id} className="flex flex-col items-center gap-2">
          <div
            className="w-16 h-16 rounded flex items-center justify-center"
            style={{ backgroundColor: tech.bgColor }}
          >
            {renderTechIcon(tech)}
          </div>
          <span className="uppercase text-xs font-semibold">{tech.name}</span>
        </div>
      ))}
    </div>
  );
}

export default TechStack;
