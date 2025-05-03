/**
 * Main entry point for the React application
 * Responsible for rendering the root component into the DOM
 */

// React core imports
import { StrictMode } from "react"; // Imports StrictMode to catch potential problems
import { createRoot } from "react-dom/client"; // Import for React 18's createRoot API

// Global styles and component imports
import "./index.css"; // Import global styles (includes Tailwind CSS)
import App from "./App.jsx"; // Import the root App component
import { AppProvider } from "./context/AppContext"; // Import the context provider for global state
import axios from "axios"; // Import axios for API communication

// This POST request to an external API acts as a startup beacon
// It signals that the application has been loaded in a user's browser
// This could be used for analytics, monitoring, or triggering server-side events
// NOTE: In a production environment, this should be replaced with proper analytics or monitoring service
axios
  .post("https://reqres.in/api/workintech", {
    message: "Application started",
    timestamp: new Date().toISOString(),
  })
  .then((response) => {
    console.log("API communication successful:", response.data);
  })
  .catch((error) => {
    console.error("API communication error:", error);
  });

// Create a root using React 18's createRoot API and render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 
      StrictMode is a development tool that:
      - Identifies components with unsafe lifecycles
      - Warns about legacy/deprecated API usage
      - Helps detect unexpected side effects
      - Runs certain checks and warnings twice in development
    */}
    <AppProvider>
      {/* 
        AppProvider wraps the app with the global context provider
        Provides language and theme preferences to all components
        Manages dark/light mode and translations
      */}
      <App /> {/* Main application component */}
    </AppProvider>
  </StrictMode>
);
