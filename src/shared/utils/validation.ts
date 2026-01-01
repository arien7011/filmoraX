/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Password strength validation
 */
export interface PasswordStrength {
  score: number; // 0-4
  label: "weak" | "fair" | "good" | "strong" | "very-strong";
  suggestions: string[];
}

export function checkPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  const suggestions: string[] = [];

  if (password.length >= 8) {
    score++;
  } else {
    suggestions.push("Use at least 8 characters");
  }

  if (/[a-z]/.test(password)) {
    score++;
  } else {
    suggestions.push("Include lowercase letters");
  }

  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    suggestions.push("Include uppercase letters");
  }

  if (/[0-9]/.test(password)) {
    score++;
  } else {
    suggestions.push("Include numbers");
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score++;
  } else {
    suggestions.push("Include special characters");
  }

  const labels: PasswordStrength["label"][] = [
    "weak",
    "fair",
    "good",
    "strong",
    "very-strong",
  ];

  return {
    score: Math.min(score, 4),
    label: labels[Math.min(score, 4)] ?? "weak",
    suggestions,
  };
}

/**
 * Required field validation
 */
export function isRequired(value: string | null | undefined): boolean {
  return value !== null && value !== undefined && value.trim().length > 0;
}

/**
 * Min length validation
 */
export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

/**
 * Max length validation
 */
export function maxLength(value: string, max: number): boolean {
  return value.length <= max;
}

/**
 * Form validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate login form
 */
export function validateLoginForm(data: {
  email: string;
  password: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(data.email)) {
    errors["email"] = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors["email"] = "Invalid email format";
  }

  if (!isRequired(data.password)) {
    errors["password"] = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate registration form
 */
export function validateRegisterForm(data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(data.name)) {
    errors["name"] = "Name is required";
  } else if (!minLength(data.name, 2)) {
    errors["name"] = "Name must be at least 2 characters";
  }

  if (!isRequired(data.email)) {
    errors["email"] = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors["email"] = "Invalid email format";
  }

  if (!isRequired(data.password)) {
    errors["password"] = "Password is required";
  } else if (!minLength(data.password, 8)) {
    errors["password"] = "Password must be at least 8 characters";
  }

  if (!isRequired(data.confirmPassword)) {
    errors["confirmPassword"] = "Please confirm your password";
  } else if (data.password !== data.confirmPassword) {
    errors["confirmPassword"] = "Passwords do not match";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
