/**
 * Tailwind CSS Configuration File
 * Configures the utility-first CSS framework used throughout the application
 * See https://tailwindcss.com/docs/configuration for full documentation
 */

/** @type {import('tailwindcss').Config} */
export default {
  // Files to scan for class usage
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS files in src directory
  ],

  // Enable dark mode based on class (not system preference by default)
  // This allows the app to control dark mode via the theme toggle
  darkMode: "class",

  // Customize the default Tailwind theme
  theme: {
    extend: {
      // Add custom font family
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Use Inter as the primary sans-serif font
      },
      // Additional theme extensions can be added here
    },
  },

  // Tailwind plugins - currently none are used
  plugins: [],
};
