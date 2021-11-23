import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class ShareComponent implements OnInit {
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
  ngOnInit(): void {}
}
