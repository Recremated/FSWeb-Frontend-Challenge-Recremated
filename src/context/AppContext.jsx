/**
 * Global application context for managing language and theme preferences
 * Provides translations and theme control across the entire application
 */
import { createContext, useContext, useState, useEffect } from "react";
import { enData } from "../mock/en";
import { trData } from "../mock/tr";

// Create the context for global state management
const AppContext = createContext();

// Custom hook to use the context from any component
export const useAppContext = () => {
  return useContext(AppContext);
};

/**
 * Helper function to detect the user's system color scheme preference
 * @returns {string} "dark" or "light" based on system preference
 */
const getSystemThemePreference = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
};

/**
 * Provider component that wraps the app to provide global context
 * Manages language and theme preferences with localStorage persistence
 */
export const AppProvider = ({ children }) => {
  // Track if theme is set to auto (follows system preference)
  const [isAutoTheme, setIsAutoTheme] = useState(() => {
    return localStorage.getItem("themeMode") === "auto";
  });

  // Initialize language state from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "en";
  });

  // Initialize theme state from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const themeMode = localStorage.getItem("themeMode");

    if (themeMode === "auto") {
      return getSystemThemePreference();
    }

    const savedTheme = localStorage.getItem("theme");
    return savedTheme || getSystemThemePreference();
  });

  // Set translations based on selected language
  const [translations, setTranslations] = useState(
    language === "en" ? enData : trData
  );

  // Update translations when language changes and save to localStorage
  useEffect(() => {
    if (language === "en") {
      setTranslations(enData);
    } else if (language === "tr") {
      setTranslations(trData);
    }

    // Save language preference to localStorage
    localStorage.setItem("language", language);
  }, [language]);

  // Apply theme to document and save to localStorage when theme changes
  useEffect(() => {
    // Apply theme attribute to document for CSS variables
    document.documentElement.setAttribute("data-theme", theme);

    // Apply Tailwind dark mode class
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Only save to localStorage if not in auto mode
    if (!isAutoTheme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, isAutoTheme]);

  // Add system theme change listener for auto theme mode
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Update theme if in auto mode
      if (isAutoTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // Clean up listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [isAutoTheme]);

  /**
   * Function to change the application language
   * @param {string} lang - The language code to switch to (en/tr)
   */
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  /**
   * Function to change the application theme
   * @param {string} newTheme - The theme to switch to (light/dark/auto)
   */
  const changeTheme = (newTheme) => {
    // If setting to "auto", use the system preference
    if (newTheme === "auto") {
      setIsAutoTheme(true);
      localStorage.setItem("themeMode", "auto");
      setTheme(getSystemThemePreference());
    } else {
      setIsAutoTheme(false);
      localStorage.setItem("themeMode", "manual");
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
    }
  };

  /**
   * Translation function to get localized text
   * @param {string} key - The translation key to look up
   * @returns {string} - The translated text or the key if translation not found
   */
  const t = (key) => {
    return translations[key] || key;
  };

  // Context value with all state and functions
  const value = {
    language,
    theme,
    isAutoTheme,
    t,
    changeLanguage,
    changeTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
