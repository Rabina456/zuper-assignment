import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output,ChangeDetectorRef } from '@angular/core';
import { FieldGroup } from '../../models/field-group.model';
import { FieldGroupService } from '../../services/field-group.service';
import { FormsModule } from '@angular/forms';
import { FormElement } from '../../models/form-element.model';

@Component({
  selector: 'app-field-groups',
  imports: [CommonModule,FormsModule],
  templateUrl: './field-groups.component.html',
  styleUrl: './field-groups.component.css'
})
export class FieldGroupsComponent {

  @Input() fieldGroups: FieldGroup[] = [];
  @Input() selectedGroup: FieldGroup | null = null;
  @Output() groupSelected = new EventEmitter<FieldGroup>();
  @Output() groupEdited = new EventEmitter<FieldGroup>();
  @Output() groupDeleted = new EventEmitter<FieldGroup>();
  @Output() groupCreated = new EventEmitter<void>();

  
   
  

  constructor(private fieldGroupService: FieldGroupService) {
      
  }

  onSelectGroup(group: any) {
    this.fieldGroupService.selectGroup(group); // Notify service of the selected group
  }
  

  selectFieldGroup(group: FieldGroup) {
    this.groupSelected.emit(group);
  }

  editFieldGroup(group: FieldGroup) {
    this.groupEdited.emit(group);
  }

  deleteFieldGroup(group: FieldGroup) {
    this.groupDeleted.emit(group);
  }

  createFieldGroup() {
    this.groupCreated.emit();
  }
  
  
}
