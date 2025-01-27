export interface ValidationRule {
    type: ValidationType; // Type of validation (e.g., 'required', 'maxLength')
    value?: any; // Value associated with the validation rule (e.g., max length = 10)
    errorMessage?: string; // Custom error message for the validation rule
  }
  
  export type ValidationType =
    | 'required'
    | 'minLength'
    | 'maxLength'
    | 'pattern'
    | 'custom';
  