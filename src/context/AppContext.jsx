import { createContext, useContext, useState, useEffect } from "react";
import { enData } from "../mock/en";
import { trData } from "../mock/tr";

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Helper to detect system color scheme preference
const getSystemThemePreference = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
};

// Provider component
export const AppProvider = ({ children }) => {
  // Track if theme is set to auto
  const [isAutoTheme, setIsAutoTheme] = useState(() => {
    return localStorage.getItem("themeMode") === "auto";
  });

  // Initialize state from localStorage or defaults
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "en";
  });

  const [theme, setTheme] = useState(() => {
    const themeMode = localStorage.getItem("themeMode");

    if (themeMode === "auto") {
      return getSystemThemePreference();
    }

    const savedTheme = localStorage.getItem("theme");
    return savedTheme || getSystemThemePreference();
  });

  const [translations, setTranslations] = useState(
    language === "en" ? enData : trData
  );

  // Update translations when language changes
  useEffect(() => {
    if (language === "en") {
      setTranslations(enData);
    } else if (language === "tr") {
      setTranslations(trData);
    }

    // Save to localStorage
    localStorage.setItem("language", language);
  }, [language]);

  // Update theme on document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    // For Tailwind dark mode
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

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Update theme if in auto mode
      if (isAutoTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [isAutoTheme]);

  // Change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Change theme
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

  // Translation function
  const t = (key) => {
    return translations[key] || key;
  };

  // Context value
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
