/**
 * API Service Module
 * Centralizes all API communication with backend services
 * Uses axios for HTTP requests with consistent error handling
 */
import axios from "axios";

// Base URLs for API endpoints
// In a production environment, these would be environment variables
// Note: reqres.in is a mock API service for testing and development
const API_URL = "https://reqres.in/api";
const WORKINTECH_URL = "https://reqres.in/api/workintech";

/**
 * Send user preferences (language and theme) to the backend
 * This function is called when user changes language or theme preferences
 * It allows the backend to store user preferences for future sessions
 *
 * @param {string} language - The user's selected language code (e.g., "en", "tr")
 * @param {string} theme - The user's selected theme ("light", "dark")
 * @returns {Promise<Object>} - The response data from the server
 * @throws {Error} - If the API request fails (will be caught by the caller)
 */
export const sendUserPreferences = async (language, theme) => {
  try {
    const response = await axios.post(WORKINTECH_URL, {
      preference_type: "user_settings", // Identifies the purpose of this request
      language,
      theme,
      timestamp: new Date().toISOString(), // Add timestamp for tracking
    });
    return response.data;
  } catch (error) {
    console.error("Failed to save user preferences:", error);
    throw error; // Re-throw to allow caller to handle
  }
};

/**
 * Send contact form data to the backend
 * Used by the Contact component when a user submits the contact form
 *
 * @param {Object} formData - The form data object containing user's contact information
 * @param {string} formData.name - The user's name
 * @param {string} formData.email - The user's email address
 * @param {string} formData.message - The user's message content
 * @returns {Promise<Object>} - The response data from the server
 * @throws {Error} - If the API request fails (will be caught by the caller)
 */
export const sendContactForm = async (formData) => {
  try {
    const response = await axios.post(WORKINTECH_URL, {
      form_type: "contact", // Identifies this as a contact form submission
      ...formData,
      timestamp: new Date().toISOString(), // Add submission timestamp
    });
    return response.data;
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    throw error; // Re-throw to allow caller to handle
  }
};

/**
 * Fetch translations for a given language
 * This is for future implementation of server-side translation management
 * Currently not used as translations are stored locally in the mock directory
 *
 * @param {string} language - The language code to fetch translations for (e.g., "en", "tr")
 * @returns {Promise<Object>} - The translation data for the requested language
 * @throws {Error} - If the API request fails (will be caught by the caller)
 */
export const fetchTranslations = async (language) => {
  try {
    const response = await axios.get(`${API_URL}/translations/${language}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch translations for ${language}:`, error);
    throw error; // Re-throw to allow caller to handle
  }
};
