// src/app/shared/utils/helpers.ts

// Function to generate a unique ID
export function generateUniqueId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 9);
  }
  
  // Function to format a date to a readable string
  export function formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  
  // Function to deep copy an object (useful for cloning form elements or groups)
  export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
  