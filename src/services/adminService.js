import {
  skillsData,
  projectsData,
  profileData,
  contactData,
  techStackData,
} from "../data";

export const getSkills = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(skillsData), 300);
  });
};

export const updateSkills = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, data }), 500);
  });
};

export const getProjects = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(projectsData), 300);
  });
};

export const updateProjects = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, data }), 500);
  });
};

export const getProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(profileData), 300);
  });
};

export const updateProfile = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, data }), 500);
  });
};

export const getContact = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(contactData), 300);
  });
};

export const updateContact = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, data }), 500);
  });
};

export const getTechStack = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(techStackData), 300);
  });
};

export const updateTechStack = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, data }), 500);
  });
};
