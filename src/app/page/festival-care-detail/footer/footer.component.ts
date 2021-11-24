import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'festival-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  @Input() isIphoneX: boolean = false;
  @Output() onEdit = new EventEmitter();
  @Output() onShare = new EventEmitter();
  @Output() onCreatePoster = new EventEmitter();
  constructor() {}

  edit(): void {
    this.onEdit.emit();
  }
  share(): void {
    this.onShare.emit();
  }
  createPoster(): void {
    this.onCreatePoster.emit();
  }
}
