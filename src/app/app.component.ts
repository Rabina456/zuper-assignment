import { Component ,ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FieldGroupsComponent } from '../Components/field-groups/field-groups.component';
import { FormElementsComponent } from '../Components/form-elements/form-elements.component';
import { CommonModule } from '@angular/common';
import { FormElement } from '../models/form-element.model';
import { FieldGroup } from '../models/field-group.model';
import { RightDrawerComponent } from '../Components/right-drawer/right-drawer.component';
import { RightPaneComponent } from '../Components/right-pane/right-pane.component';



@Component({
  selector: 'app-root',
  imports: [CommonModule,FieldGroupsComponent,FormElementsComponent,RightDrawerComponent,RightPaneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent 
implements AfterViewChecked {
  title = 'assignment';
 

  //fieldGroups: FieldGroup[] = [];
  selectedGroup: FieldGroup | null = null;
  selectedElement: FormElement | null = null;
  availableElements: FormElement[] = [
    {
      id: 1,
      type: 'single-line-text',
      name: 'Text Field',
      placeholder: 'Enter text',
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      type: 'dropdown',
      name: 'Dropdown Field',
      options: [
        { id: '1', label: 'Option 1', value: '1' },
        { id: '2', label: 'Option 2', value: '2' },
      ],
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      type: 'date',
      name: 'Date Picker',
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  fieldGroups: FieldGroup[] = [
    {
      id: 1,
      name: 'Personal Info',
      description: 'Personal Information Group',
      elements: [this.availableElements[0], this.availableElements[1]], // Grouping elements
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Location Info',
      description: 'Location Information Group',
      elements: [this.availableElements[2]], // Grouping elements
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  constructor(private cdRef: ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadFieldGroups();
  }
 

  ngAfterViewChecked() {
    this.initializeDragAndDrop(); // Re-initialize drag-and-drop after the view is updated
  }

  initializeDragAndDrop() {
    // Assuming you are using a custom drag-and-drop directive or a library
    // Re-bind the events here for all draggable and droppable elements
    const draggableElements = document.querySelectorAll('.draggable');
    const droppableAreas = document.querySelectorAll('.droppable');

    draggableElements.forEach((el) => {
      // Apply event listeners for drag and drop logic here
      // e.g., `el.addEventListener('dragstart', (e) => {...})`
    });

    droppableAreas.forEach((el) => {
      // Apply event listeners for the drop logic here
    });
  }
  // Load field groups from local storage
  loadFieldGroups() {
    const storedGroups = localStorage.getItem('fieldGroups');
    if (storedGroups) {
      this.fieldGroups = JSON.parse(storedGroups);
    }
  }

  // Save field groups to local storage
  saveFieldGroups() {
    localStorage.setItem('fieldGroups', JSON.stringify(this.fieldGroups));
  }

  // Field group actions
  createFieldGroup() {
    const newGroup: FieldGroup = {
      id: Date.now(),
      name: 'New Field Group',
      description: 'Description here',
      elements: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.fieldGroups.push(newGroup);
    this.saveFieldGroups();
    // //this.cdRef.detectChanges(); 
  }

  editFieldGroup(group: FieldGroup) {
    const name = prompt('Enter new name for the group:', group.name);
    if (name) {
      group.name = name;
      group.updatedAt = new Date();
      this.saveFieldGroups();
      // //this.cdRef.detectChanges();
    }
  }

  deleteFieldGroup(group: FieldGroup) {
    if (confirm(`Are you sure you want to delete "${group.name}"?`)) {
      this.fieldGroups = this.fieldGroups.filter((g) => g.id !== group.id);
      this.selectedGroup = null;
      this.saveFieldGroups();
      //this.cdRef.detectChanges();
    }
  }

  selectFieldGroup(group: FieldGroup) {
    this.selectedGroup = group;
    this.selectedElement = null;
  }

  // Form element actions
  addElementToGroup(element: any) {
    if (this.selectedGroup) {
      const newElement = { ...element, id: Date.now().toString(), order: this.selectedGroup.elements.length + 1 };
      this.selectedGroup.elements.push(newElement);
      this.selectedGroup.updatedAt = new Date();
      this.saveFieldGroups();
      //this.cdRef.detectChanges();
    }
  }

  selectFormElement(element: any) {
    this.selectedElement = element;
  }

  deleteFormElement(element: any) {
    if (this.selectedGroup) {
      this.selectedGroup.elements = this.selectedGroup.elements.filter((el) => el.id !== element.id);
      this.selectedGroup.updatedAt = new Date();
      this.selectedElement = null;
      this.saveFieldGroups();
      //this.cdRef.detectChanges();
    }
  }

  updateFormElement(element: any) {
    if (this.selectedGroup && element) {
      const index = this.selectedGroup.elements.findIndex((el) => el.id === element.id);
      if (index > -1) {
        this.selectedGroup.elements[index] = { ...element };
        this.selectedGroup.updatedAt = new Date();
        this.saveFieldGroups();
        //this.cdRef.detectChanges();
      }
    }
  }

  
}

