import { useAppContext } from "../context/AppContext";

const LanguageSelector = ({ className = "", variant = "default" }) => {
  const { t, language, changeLanguage } = useAppContext();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "tr" : "en";
    changeLanguage(newLanguage);
  };

  // Style variants
  const variants = {
    default:
      "text-sm py-1 px-3 rounded border border-gray-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-400 transition-colors",
    minimal: "hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
    accent: "text-lime-400 hover:text-lime-300 transition-colors",
    filled:
      "py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors",
  };

  const buttonClass = variants[variant] || variants.default;

  return (
    <button
      onClick={toggleLanguage}
      className={`${buttonClass} ${className}`}
      aria-label={language === "en" ? "Switch to Turkish" : "Switch to English"}
    >
      {t("changeLanguage")}
    </button>
  );
};

export default LanguageSelector;
