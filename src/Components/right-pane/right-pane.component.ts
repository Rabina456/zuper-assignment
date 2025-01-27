import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormElement } from '../../models/form-element.model';
import { CommonModule } from '@angular/common';
import { DragDropService } from '../../services/drag-drop.service';


@Component({
  selector: 'app-right-pane',
  imports: [CommonModule],
  templateUrl: './right-pane.component.html',
  styleUrl: './right-pane.component.css'
})
export class RightPaneComponent {

  @Input() availableElements: FormElement[] = [];
  @Output() elementDragged = new EventEmitter<FormElement>();

  constructor(private dragDropService: DragDropService){}

  dragElement(event: DragEvent,element: FormElement) {
    event.dataTransfer?.setData('text', JSON.stringify(element)); 
    this.elementDragged.emit(element);
    this.dragDropService.setDraggedElement(element);
  }

  addElementToGroup(element:FormElement){}

  renderElement(element: FormElement) {
    switch (element.type) {
      case 'single-line-text':
        return `<input type="text" placeholder="${element.placeholder}" />`;
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
