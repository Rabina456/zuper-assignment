import { Injectable } from '@angular/core';
import { FieldGroup } from '../models/field-group.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldGroupService {

  private storageKey = 'fieldGroups';
  private selectedGroup = new BehaviorSubject<FieldGroup[]>([]); // Holds the current field groups in a subject (observable)
  selectedGroup$ = this.selectedGroup.asObservable();

  constructor() {}

  selectGroup(group:FieldGroup[]){
    this.selectedGroup.next(group);
  }
  clearSelectedGroup() {
    this.selectedGroup.next([]);
  }
  // Get all field groups from local storage
  getFieldGroups(): FieldGroup[] {
    const fieldGroups = localStorage.getItem(this.storageKey);
    return fieldGroups ? JSON.parse(fieldGroups) : [];
  }

  // Save field groups to local storage
  saveFieldGroups(fieldGroups: FieldGroup[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(fieldGroups));
  }

  // Create a new field group
  createFieldGroup(name: string): void {
    const fieldGroups = this.getFieldGroups();
    const newFieldGroup: FieldGroup = {
      id: Date.now(),  // Assigning a unique ID
      name: name,
      description: '',  // Default value
      elements: [],     // Default empty array
      createdAt: new Date(), // Set created date
      updatedAt: new Date() // Set updated date
    };
    fieldGroups.push(newFieldGroup);
    this.saveFieldGroups(fieldGroups);
  }

  // Edit an existing field group
  editFieldGroup(id: number, newName: string): void {
    const fieldGroups = this.getFieldGroups();
    const fieldGroup = fieldGroups.find((group) => group.id === id);
    if (fieldGroup) {
      fieldGroup.name = newName;
      this.saveFieldGroups(fieldGroups);
    }
  }

  // Delete a field group
  deleteFieldGroup(id: number): void {
    let fieldGroups = this.getFieldGroups();
    fieldGroups = fieldGroups.filter((group) => group.id !== id);
    this.saveFieldGroups(fieldGroups);
  }
}
