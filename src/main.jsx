/**
 * Main entry point for the React application
 */
import { StrictMode } from "react"; // Imports StrictMode to catch potential problems
import { createRoot } from "react-dom/client"; // Import for React 18's createRoot API
import "./index.css"; // Import global styles
import App from "./App.jsx"; // Import the root App component
import { AppProvider } from "./context/AppContext"; // Import the context provider for global state

// Create a root using React 18's createRoot API and render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {" "}
    {/* StrictMode helps to identify potential problems */}
    <AppProvider>
      {" "}
      {/* Wraps the app with the global context provider for state management */}
      <App /> {/* Main application component */}
    </AppProvider>
  </StrictMode>
);
