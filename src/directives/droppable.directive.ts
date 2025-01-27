// src/app/directives/droppable.directive.ts
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {
  constructor(private el: ElementRef) {}

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Necessary to allow dropping
    this.el.nativeElement.style.backgroundColor = '#f0f0f0'; // Add feedback
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    this.el.nativeElement.style.backgroundColor = ''; // Reset feedback
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    console.log('Dropped element ID:', data); // Handle dropped data
    this.el.nativeElement.style.backgroundColor = ''; // Reset background
  }
}
