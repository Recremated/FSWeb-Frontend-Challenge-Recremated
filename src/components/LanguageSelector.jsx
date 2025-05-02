/**
 * LanguageSelector Component
 * Provides a button to toggle between available languages (English and Turkish)
 * Supports different visual styles through the variant prop
 *
 * @param {string} className - Additional CSS classes for the button
 * @param {string} variant - Visual style variant ("default", "minimal", "accent", or "filled")
 */
import { useAppContext } from "../context/AppContext"; // Import global context for language state

const LanguageSelector = ({ className = "", variant = "default" }) => {
  // Extract language state and functions from global context
  const { t, language, changeLanguage } = useAppContext();

  /**
   * Toggle between English and Turkish languages
   * Calls the context function to update language globally
   */
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "tr" : "en";
    changeLanguage(newLanguage);
  };

  // Style variants for different visual appearances of the button
  const variants = {
    default:
      "text-sm py-1 px-3 rounded border border-gray-300 hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-400 transition-colors",
    minimal: "hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
    accent: "text-lime-400 hover:text-lime-300 transition-colors",
    filled:
      "py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors",
  };

  // Get the appropriate style classes based on the variant or default to the default style
  const buttonClass = variants[variant] || variants.default;

  return (
    <button
      onClick={toggleLanguage}
      className={`${buttonClass} ${className}`}
      aria-label={language === "en" ? "Switch to Turkish" : "Switch to English"} // Accessibility label for screen readers
    >
      {t("changeLanguage")} {/* Translated button text */}
    </button>
  );
};

export default LanguageSelector;
