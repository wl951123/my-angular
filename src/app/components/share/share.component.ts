import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'festival-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class ShareComponent {
  @Input() isShare: boolean = false;
  @Output() onCancel = new EventEmitter();
  @Output() onShare = new EventEmitter<string>();
  constructor() {}

  cancel(e: Event): void {
    e.stopPropagation();
    this.onCancel.emit();
  }

  share(type: string): void {
    this.onShare.emit(type);
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }
}
