import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'festival-text-layout',
  templateUrl: './text-layout.component.html',
  styleUrls: ['./text-layout.component.css'],
})
export class TextLayoutComponent {
  @Input() style = {};
  @Input() layoutType: number = 1;
  @Input() texts: string[] = [];
  @Output() editEvent = new EventEmitter();

  constructor() {}

  onEdit(): void {
    this.editEvent.emit();
  }
}
