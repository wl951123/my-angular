import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PosterInfo } from 'src/type/common';

@Component({
  selector: 'app-poster-model',
  templateUrl: './poster-model.component.html',
  styleUrls: ['./poster-model.component.css'],
})
export class PosterModelComponent implements OnInit {
  @Input() showModel: boolean = false;
  @Input() grid: PosterInfo = { loading: true };
  @Output() close = new EventEmitter();
  @Output() touchStart = new EventEmitter();
  @Output() touchEnd = new EventEmitter();
  constructor() {}
  onClose(): void {
    this.close.emit();
  }

  onTouchStart = () => {
    this.touchStart.emit();
  };

  onTouchEnd = () => {
    this.touchEnd.emit();
  };

  ngOnInit(): void {}
}
