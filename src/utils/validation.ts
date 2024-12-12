export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  
  return { isValid: true };
};

export const validateTodo = (title: string, description: string): ValidationResult => {
  if (!title.trim()) {
    return { isValid: false, message: 'Title is required' };
  }
  
  if (title.length > 100) {
    return { isValid: false, message: 'Title must be less than 100 characters' };
  }
  
  if (description.length > 500) {
    return { isValid: false, message: 'Description must be less than 500 characters' };
  }
  
  return { isValid: true };
};