// src/utils/checkInStorage.js

const STORAGE_KEY = 'keenkeeper_check_ins';

// Read all check-ins from localStorage
export const getCheckIns = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to read check-ins from localStorage:', error);
    return [];
  }
};

// Add a new check-in to the top of the list
export const addCheckIn = (newEntry) => {
  const existing = getCheckIns();
  const updated = [newEntry, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

// Optional: Delete a single check-in by id
export const removeCheckIn = (id) => {
  const existing = getCheckIns();
  const updated = existing.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

// Optional: Clear all check-ins
export const clearCheckIns = () => {
  localStorage.removeItem(STORAGE_KEY);
};