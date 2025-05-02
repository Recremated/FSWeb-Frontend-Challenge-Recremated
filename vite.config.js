/**
 * Vite Configuration File
 * Configures the Vite build tool for the React application
 * See https://vite.dev/config/ for all available options
 */
import { defineConfig } from "vite"; // Import Vite configuration function
import react from "@vitejs/plugin-react"; // React plugin for JSX support
import tailwindcss from "@tailwindcss/vite"; // TailwindCSS plugin for styling support

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // Enable React/JSX support
    tailwindcss(), // Enable TailwindCSS processing
  ],
  // Additional configuration options can be added here as needed
});
