import axios from "axios";

const API_URL = "https://reqres.in/api";

/**
 * Send user preferences (language and theme) to the backend
 */
export const sendUserPreferences = async (language, theme) => {
  const response = await axios.post(`${API_URL}/users`, {
    language,
    theme,
  });
  return response.data;
};

/**
 * Send contact form data to the backend
 */
export const sendContactForm = async (formData) => {
  const response = await axios.post(`${API_URL}/contact`, formData);
  return response.data;
};

/**
 * Fetch translations for a given language (for future backend integration)
 */
export const fetchTranslations = async (language) => {
  const response = await axios.get(`${API_URL}/translations/${language}`);
  return response.data;
};
