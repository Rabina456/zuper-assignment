import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormElement } from '../../models/form-element.model';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
 
@Component({
  selector: 'app-right-drawer',
  imports: [CommonModule,FormsModule],
  templateUrl: './right-drawer.component.html',
  styleUrl: './right-drawer.component.css'
})
export class RightDrawerComponent {
  @Input() selectedElement: FormElement | null = null;
  @Output() propertiesSaved = new EventEmitter<FormElement>();

  saveProperties() {
    if (this.selectedElement) {
      this.propertiesSaved.emit(this.selectedElement);
    }
  }

  
}
