// src/app/directives/draggable.directive.ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @Input() appDraggable: string | undefined;

  constructor(private el: ElementRef) {}

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    const element = this.el.nativeElement;
    event.dataTransfer?.setData('text/plain', this.appDraggable ?? element.id);
    element.style.opacity = '0.5'; // Add visual feedback for dragging
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent): void {
    const element = this.el.nativeElement;
    element.style.opacity = '1'; // Reset visual feedback
  }
}
