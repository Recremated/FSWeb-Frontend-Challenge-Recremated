import { useAppContext } from "../context/AppContext";

const ThemeSelector = ({ className = "", size = "medium" }) => {
  const { theme, t, changeTheme } = useAppContext();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme);
  };

  // Size variants for the toggle with responsive sizes
  const sizeClasses = {
    small: {
      container: "w-8 h-4 md:w-9 md:h-5 lg:w-10 lg:h-5",
      thumb: "w-3 h-3 md:w-4 md:h-4 lg:w-4 lg:h-4",
      thumbPosition:
        theme === "dark"
          ? "translate-x-4 md:translate-x-4 lg:translate-x-5"
          : "translate-x-0.5",
    },
    medium: {
      container: "w-10 h-5 md:w-11 md:h-6 lg:w-12 lg:h-6",
      thumb: "w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5",
      thumbPosition:
        theme === "dark"
          ? "translate-x-5 md:translate-x-5 lg:translate-x-6"
          : "translate-x-0.5",
    },
    large: {
      container: "w-12 h-6 md:w-14 md:h-7 lg:w-14 lg:h-7",
      thumb: "w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6",
      thumbPosition:
        theme === "dark"
          ? "translate-x-6 md:translate-x-7 lg:translate-x-7"
          : "translate-x-0.5",
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={`flex items-center gap-2 md:gap-2.5 lg:gap-3 ${className}`}>
      {/* Show appropriate text based on current theme */}
      <span className="uppercase text-xs md:text-sm lg:text-base font-bold tracking-wide text-white">
        <span className="hidden lg:inline">
          {theme === "dark" ? t("darkMode") : t("lightMode")}
        </span>
        <span className="lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </span>
      </span>
      <button
        onClick={toggleTheme}
        className={`relative ${currentSize.container} ${
          theme === "dark" ? "bg-indigo-500" : "bg-gray-300"
        } rounded-full transition-colors duration-300`}
        aria-label={
          theme === "light" ? "Enable dark mode" : "Disable dark mode"
        }
      >
        <div
          className={`absolute ${
            currentSize.thumb
          } bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            currentSize.thumbPosition
          } ${
            theme === "dark" ? "top-0.5" : "top-0.5"
          } flex items-center justify-center overflow-hidden`}
        >
          {theme === "light" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-yellow-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10.719 2.082c-2.572 2.028-4.719 5.212-4.719 9.918 0 4.569 1.938 7.798 4.548 9.895-4.829-.705-8.548-4.874-8.548-9.895 0-5.08 3.808-9.288 8.719-9.918zm1.281-2.082c-6.617 0-12 5.383-12 12s5.383 12 12 12c1.894 0 3.87-.333 5.37-1.179-3.453-.613-9.37-3.367-9.37-10.821 0-7.555 6.422-10.317 9.37-10.821-1.74-.682-3.476-1.179-5.37-1.179z" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};

export default ThemeSelector;
