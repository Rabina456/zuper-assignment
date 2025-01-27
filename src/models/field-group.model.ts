import { FormElement } from './form-element.model';

export interface FieldGroup {
  id: number; // Unique identifier for the field group
  name: string; // Name of the field group
  description: string; // Description of the field group
  elements: FormElement[]; // List of form elements within the field group
  createdAt: Date; // Timestamp for when the field group was created
  updatedAt: Date; // Timestamp for the last update
}
