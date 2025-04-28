import { useAppContext } from "../context/AppContext";

const ThemeSelector = ({ className = "", size = "medium" }) => {
  const { theme, t, changeTheme } = useAppContext();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme);
  };

  // Size variants for the toggle
  const sizeClasses = {
    small: {
      container: "w-10 h-5",
      thumb: "w-4 h-4",
      thumbPosition: theme === "dark" ? "translate-x-5" : "translate-x-0.5",
    },
    medium: {
      container: "w-12 h-6",
      thumb: "w-5 h-5",
      thumbPosition: theme === "dark" ? "translate-x-6" : "translate-x-0.5",
    },
    large: {
      container: "w-14 h-7",
      thumb: "w-6 h-6",
      thumbPosition: theme === "dark" ? "translate-x-7" : "translate-x-0.5",
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="uppercase text-xs font-bold tracking-wide text-white">
        {t("darkMode")}
      </span>
      <button
        onClick={toggleTheme}
        className={`relative ${currentSize.container} bg-blue-200 dark:bg-indigo-500 rounded-full transition-colors duration-300`}
        aria-label={
          theme === "light" ? "Enable dark mode" : "Disable dark mode"
        }
      >
        <div
          className={`absolute ${
            currentSize.thumb
          } bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            currentSize.thumbPosition
          } ${theme === "dark" ? "top-0.5" : "top-0.5"}`}
        ></div>
      </button>
    </div>
  );
};

export default ThemeSelector;
