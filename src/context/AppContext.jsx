/**
 * Global application context for managing language and theme preferences
 * Provides translations and theme control across the entire application
 * Implements centralized state management for UI preferences with persistent storage
 */
import { createContext, useContext, useState, useEffect } from "react";
import { enData } from "../mock/en";
import { trData } from "../mock/tr";
import { sendUserPreferences } from "../services/api";

// Create the context for global state management
// This context will be used by components to access and modify the global state
const AppContext = createContext();

// Custom hook to use the context from any component
// This provides a clean and consistent way to access the context throughout the app
export const useAppContext = () => {
  return useContext(AppContext);
};

/**
 * Helper function to detect the user's system color scheme preference
 * Uses the prefers-color-scheme media query to detect OS-level theme settings
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
 * Handles theme synchronization with the OS and theme switching
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components that will have access to the context
 */
export const AppProvider = ({ children }) => {
  // Track if theme is set to auto (follows system preference)
  // This is a separate state from the actual theme value to track the mode
  const [isAutoTheme, setIsAutoTheme] = useState(() => {
    return localStorage.getItem("themeMode") === "auto";
  });

  // Initialize language state from localStorage or default to English
  // Uses a function for the initial state to only run once on component mount
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "en";
  });

  // Initialize theme state from localStorage or system preference
  // Respects the auto theme setting if enabled
  const [theme, setTheme] = useState(() => {
    const themeMode = localStorage.getItem("themeMode");

    if (themeMode === "auto") {
      return getSystemThemePreference();
    }

    const savedTheme = localStorage.getItem("theme");
    return savedTheme || getSystemThemePreference();
  });

  // Set translations based on selected language
  // This tracks the actual translation data object to use throughout the app
  const [translations, setTranslations] = useState(
    language === "en" ? enData : trData
  );

  // Update translations when language changes and save to localStorage
  // This effect runs whenever the language state changes
  useEffect(() => {
    if (language === "en") {
      setTranslations(enData);
    } else if (language === "tr") {
      setTranslations(trData);
    }

    // Save language preference to localStorage for persistence between sessions
    localStorage.setItem("language", language);
  }, [language]);

  // Apply theme to document and save to localStorage when theme changes
  // This effect handles the actual application of the theme to the DOM
  useEffect(() => {
    // Apply theme attribute to document for CSS variables
    // This is used by the CSS custom properties defined in index.css
    document.documentElement.setAttribute("data-theme", theme);

    // Apply Tailwind dark mode class
    // This enables Tailwind's dark: variant classes
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Only save to localStorage if not in auto mode
    // In auto mode, we want to follow the system preference, not save a specific theme
    if (!isAutoTheme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, isAutoTheme]);

  // Add system theme change listener for auto theme mode
  // This effect sets up an event listener to detect OS theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Handler function to update theme when system preference changes
    const handleChange = (e) => {
      // Update theme if in auto mode
      if (isAutoTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // Clean up listener on component unmount to prevent memory leaks
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [isAutoTheme]);

  /**
   * Function to change the application language
   * Updates the language state and saves the preference
   * Also sends the preference to the backend for analytics or user profile storage
   * @param {string} lang - The language code to switch to (en/tr)
   */
  const changeLanguage = (lang) => {
    setLanguage(lang);

    // Send language preference to the backend
    // This allows the server to store user preferences for future visits
    // or to gather analytics about language usage
    sendUserPreferences(lang, theme)
      .then((response) => {
        console.log("User preferences saved:", response);
      })
      .catch((error) => {
        console.error("Error saving user preferences:", error);
      });
  };

  /**
   * Function to change the application theme
   * Handles switching between light, dark, and auto (system) modes
   * Updates theme state, local storage, and sends preference to backend
   * @param {string} newTheme - The theme to switch to (light/dark/auto)
   */
  const changeTheme = (newTheme) => {
    const actualTheme =
      newTheme === "auto" ? getSystemThemePreference() : newTheme;

    // If setting to "auto", use the system preference and update auto mode state
    if (newTheme === "auto") {
      setIsAutoTheme(true);
      localStorage.setItem("themeMode", "auto");
      setTheme(actualTheme);
    } else {
      // If setting to a specific theme, disable auto mode
      setIsAutoTheme(false);
      localStorage.setItem("themeMode", "manual");
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
    }

    // Send theme preference to the backend
    // This allows the server to store user preferences for future visits
    // or to gather analytics about theme usage
    sendUserPreferences(language, actualTheme)
      .then((response) => {
        console.log("User preferences saved:", response);
      })
      .catch((error) => {
        console.error("Error saving user preferences:", error);
      });
  };

  /**
   * Translation function to get localized text
   * Retrieves a string from the current language translation object
   * @param {string} key - The translation key to look up
   * @returns {string} - The translated text or the key if translation not found
   */
  const t = (key) => {
    return translations[key] || key;
  };

  // Context value with all state and functions
  // This is the value that will be available to all components using the context
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
