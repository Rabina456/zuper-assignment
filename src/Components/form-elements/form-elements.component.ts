
import { Component, Input, HostListener, Output, EventEmitter, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDrag } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormElement } from '../../models/form-element.model';
import { DragDropService } from '../../services/drag-drop.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app/app.component';
import { FieldGroupService } from '../../services/field-group.service';


interface FieldGroup {
  name: string;
  elements: any[];
}

@Component({
  selector: 'app-form-elements',
  imports: [DragDropModule, CommonModule, FormsModule],
  templateUrl: './form-elements.component.html',
  styleUrl: './form-elements.component.css'
})


export class FormElementsComponent implements OnInit, OnChanges {

  @Input() elements: FormElement[] = [];
  @Output() elementSelected = new EventEmitter<FormElement>();
  @Output() elementDeleted = new EventEmitter<FormElement>();
  @Output() elementUpdated = new EventEmitter<FormElement>();
  @Input() name: any;

  draggedElement: FormElement | null = null;
  draggedIndex: number | null = null;

  // To track the element that is being edited
  editingElement: FormElement | null = null;
  editedElement: FormElement | null = null;


  @Input() selectedGroup: FieldGroup | null = null;

  constructor(private dragDropService: DragDropService, private fieldGroupService: FieldGroupService) { }

  ngOnInit(): void {
    // this.fieldGroupService.selectedGroup$.subscribe((group:any) => {
    //   this.selectedGroup = group;
    //   console.log(this.selectedGroup)
    // });
    console.log(this.selectedGroup);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(this.selectedGroup);
    this.selectedGroup = changes['selectedGroup'].currentValue;
    if (changes['elements'] && changes['elements'].currentValue) {
      this.fieldGroupService.selectedGroup$.subscribe((group: any) => {
        this.selectedGroup = group;
        console.log(this.selectedGroup)
      });
    }

  }

  selectElement(element: FormElement) {
    this.elementSelected.emit(element);
  }

  deleteElement(element: FormElement) {
    this.elementDeleted.emit(element);
  }
  onDragStart(index: number, event: any) {
    this.draggedIndex = index; // Save the index of the dragged element
    this.draggedElement = this.elements[index];
    this.draggedIndex = index;
    event.dataTransfer?.setData('text', JSON.stringify(this.draggedElement));
    console.log('Dragging element at index:', index);
  }

  onDropAtIndex(event: DragEvent, index: number) {
    event.preventDefault();
    if (this.draggedElement && this.draggedIndex !== index) {
      const draggedElement = this.draggedElement;
      this.elements.splice(this.draggedIndex!, 1);
      this.elements.splice(index, 0, draggedElement);
      console.log('Reordered elements:', this.elements);
    }
    this.draggedElement = null;
    this.draggedIndex = null;


    //   event.preventDefault();
    // event.stopPropagation();

    // // Ensure the dragged element exists
    // if (this.draggedElement && this.draggedIndex !== null) {
    //   // Check if the dragged element is already in the selected group
    //   const isAlreadyPresent = this.selectedGroup.elements.some(
    //     (el:any) => el.id === this.draggedElement?.id
    //   );

    //   // If it's already in the selected group, do not add it again
    //   if (!isAlreadyPresent) {
    //     // Remove the dragged element from its original position
    //     const [removedElement] = this.elements.splice(this.draggedIndex, 1);

    //     // Insert the dragged element at the new position
    //     this.selectedGroup.elements.splice(index, 0, removedElement);

    //     console.log("Elements after reorder: ", this.selectedGroup.elements);
    //   } else {
    //     console.log("Element already exists in the selected group.");
    //   }

    //   // Reset dragged element data
    //   this.draggedElement = null;
    //   this.draggedIndex = null;
    // }
  }

  allowDrop(event: any) {
    console.log("allowDrop");
    event.preventDefault(); // This is required to allow the drop
  }


  // Drop event handler (when an element is dropped into the form elements pane)
  dropElement(event: any) {

    //event.preventDefault(); // Prevent default browser behavior

    let element = this.dragDropService.getDraggedElement();

    if (element) {
      console.log('Dropped in Middle Pane:', element);
      this.elements.push(element); // Add to the form elements list
      this.dragDropService.clearDraggedElement(); // Clear after drop
    }

  }

  startEditing(element: FormElement): void {
    this.editingElement = { ...element }; // Create a copy of the element for editing
  }
  
  saveEdit(): void {
    const index = this.elements.findIndex(e => e.id === this.editingElement?.id);
    if (index !== -1) {
      (this.elements as any)[index] = { ...this.editingElement }; // Save changes
    }
    this.cancelEdit();
  }
  
  cancelEdit(): void {
    this.editingElement = null; // Cancel editing
  }
  
 
  

  // Update element properties while editing
  updateElementDetails(field: string, value: any): void {
    if (this.editingElement) {
      (this.editingElement as any)[field] = value; // Type assertion
    }
  }

  renderElement(element: FormElement) {
    switch (element.type) {
      case 'single-line-text':
        return `
  <label for="email" class="text-sm text-gray-500">Enter customer's email</label>
  <input 
    type="email" 
    id="email" 
    placeholder="${element.placeholder}" 
    class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" 
  />
`;
      case 'multi-line-text':
        return `<textarea placeholder="${element.placeholder}"></textarea>`;
      case 'dropdown':
        return `
            <select>
              ${element.options?.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
            </select>
          `;
      case 'date':
        return `<input type="date" />`;
      case 'time':
        return `<input type="time" />`;
      case 'date-time':
        return `<input type="datetime-local" />`;
      case 'single-selection':
        return `
            <input type="radio" name="${element.name}" /> ${element.name}
          `;
      case 'multi-selection':
        return `
            <input type="checkbox" name="${element.name}" /> ${element.name}
          `;
      case 'upload':
        return `<input type="file" />`;
      default:
        return '';
    }

  }

}