import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormElement } from '../models/form-element.model';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  private draggedElement = new BehaviorSubject<FormElement | null>(null);

  setDraggedElement(element: FormElement) {
    this.draggedElement.next(element);
  }

  getDraggedElement() {
    return this.draggedElement.value;
  }

  clearDraggedElement() {
    this.draggedElement.next(null);
  }
}
