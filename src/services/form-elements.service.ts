import { Injectable } from '@angular/core';
import { FormElement, FormElementType } from '../models/form-element.model';
import {Option } from '../models/option.model';
import { ValidationRule } from '../models/validation-rule.model';

@Injectable({
  providedIn: 'root'
})
export class FormElementsService {

  private storageKey = 'formElements';

  constructor() {}

 
  getFormElements(): FormElement[] {
    const formElements = localStorage.getItem(this.storageKey);
    return formElements ? JSON.parse(formElements) : [];
  }

  // Save form elements to local storage
  saveFormElements(formElements: FormElement[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(formElements));
  }

  // Create a new form element
  createFormElement(name: string, type: FormElementType, order: number): void {
    const formElements = this.getFormElements();
    const newFormElement: FormElement = {
      id: Date.now(),
      name,
      type,
      order,
      required: false,
      placeholder: '',
      description: '',
      options: [],  // Empty options for now, can be populated later
      defaultValue: '',
      validations: [],  // Empty validations list
      style: {
        width: '100%',
        customClass: ''
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    formElements.push(newFormElement);
    this.saveFormElements(formElements);
  }

  // Edit an existing form element
  editFormElement(id: number, updatedElement: Partial<FormElement>): void {
    const formElements = this.getFormElements();
    const formElement = formElements.find((element) => element.id === id);
    if (formElement) {
      Object.assign(formElement, updatedElement);
      formElement.updatedAt = new Date();  // Update the timestamp
      this.saveFormElements(formElements);
    }
  }

  // Delete a form element
  deleteFormElement(id: number): void {
    let formElements = this.getFormElements();
    formElements = formElements.filter((element) => element.id !== id);
    this.saveFormElements(formElements);
  }

  // Toggle the 'required' field of a form element
  toggleRequired(id: number): void {
    const formElements = this.getFormElements();
    const formElement = formElements.find((element) => element.id === id);
    if (formElement) {
      formElement.required = !formElement.required;
      formElement.updatedAt = new Date();
      this.saveFormElements(formElements);
    }
  }

  // Update the options for a form element (useful for dropdown, radio buttons, etc.)
  updateOptions(id: number, options: Option[]): void {
    const formElements = this.getFormElements();
    const formElement = formElements.find((element) => element.id === id);
    if (formElement) {
      formElement.options = options;
      formElement.updatedAt = new Date();
      this.saveFormElements(formElements);
    }
  }

  // Update the validation rules for a form element
  updateValidations(id: number, validations: ValidationRule[]): void {
    const formElements = this.getFormElements();
    const formElement = formElements.find((element) => element.id === id);
    if (formElement) {
      formElement.validations = validations;
      formElement.updatedAt = new Date();
      this.saveFormElements(formElements);
    }
  }

  // Update the styling for a form element
  updateStyle(id: number, style: { width?: string; customClass?: string }): void {
    const formElements = this.getFormElements();
    const formElement = formElements.find((element) => element.id === id);
    if (formElement) {
      formElement.style = { ...formElement.style, ...style };
      formElement.updatedAt = new Date();
      this.saveFormElements(formElements);
    }
  }
}
