/**
 * Data Index File
 * Central export point for all data used in the application
 * Acts as a data aggregator to simplify imports throughout the codebase
 */

// Import all data modules
import { projectsData } from "./projects"; // Portfolio projects information
import { profileData } from "./profile"; // Personal and professional profile details
import { contactData } from "./contact"; // Contact information and social media links
import { techStackData } from "./techStack"; // Technical skills and technologies
import { enData } from "../mock/en"; // English language translations
import { trData } from "../mock/tr"; // Turkish language translations

// Re-export all data for easy access elsewhere in the application
export {
  projectsData,
  profileData,
  contactData,
  techStackData,
  enData,
  trData,
};
