/**
 * This service would handle communication with the backend admin API
 * Currently using local data for demonstration
 */

import {
  skillsData,
  projectsData,
  profileData,
  contactData,
  techStackData,
} from "../data";

/**
 * Get skills data
 */
export const getSkills = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(skillsData), 300);
  });
};

/**
 * Update skills data
 */
export const updateSkills = async (data) => {
  // In a real implementation, this would send data to the backend
  console.log("Updating skills data:", data);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 500);
  });
};

/**
 * Get projects data
 */
export const getProjects = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(projectsData), 300);
  });
};

/**
 * Update projects data
 */
export const updateProjects = async (data) => {
  console.log("Updating projects data:", data);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 500);
  });
};

/**
 * Get profile data
 */
export const getProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(profileData), 300);
  });
};

/**
 * Update profile data
 */
export const updateProfile = async (data) => {
  console.log("Updating profile data:", data);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 500);
  });
};

/**
 * Get contact data
 */
export const getContact = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(contactData), 300);
  });
};

/**
 * Update contact data
 */
export const updateContact = async (data) => {
  console.log("Updating contact data:", data);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 500);
  });
};

/**
 * Get tech stack data
 */
export const getTechStack = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(techStackData), 300);
  });
};

/**
 * Update tech stack data
 */
export const updateTechStack = async (data) => {
  console.log("Updating tech stack data:", data);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 500);
  });
};
