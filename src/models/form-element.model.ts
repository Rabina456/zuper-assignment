import { Option } from './option.model';
import { ValidationRule } from './validation-rule.model';

export interface FormElement {
  id: number; // Unique identifier for the form element
  type: FormElementType; // Type of the element (e.g., 'text', 'dropdown', 'date')
  name: string; // Name or label of the form element
  placeholder?: string; // Placeholder text for the form element
  required?: boolean; // Whether the field is mandatory
  description?: string; // Description or tooltip for the field
  options?: Option[]; // List of options (for dropdowns, radio buttons, etc.)
  defaultValue?: string; // Default value for the form element
  order: number; // Position of the element within the group (for reordering)
  validations?: ValidationRule[]; // List of validation rules for the field
  style?: {
    width?: string; // Width of the element (e.g., '100%', '50%')
    customClass?: string; // Custom CSS class for additional styling
  }; // Style properties for responsive design
  createdAt: Date,
  updatedAt: Date
}

export type FormElementType =
  | 'single-line-text'
  | 'multi-line-text'
  | 'date'
  | 'time'
  | 'date-time'
  | 'dropdown'
  | 'single-selection'
  | 'multi-selection'
  | 'upload';
