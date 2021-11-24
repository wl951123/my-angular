import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'festival-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css'],
})
export class TipsComponent implements OnInit {
  constructor() {}
  @Input() isFirstEnter: boolean = false;
  @Output() onCancel = new EventEmitter();

  onCloseMask(): void {
    this.onCancel.emit();
  }
  ngOnInit(): void {
    sessionStorage.setItem('festivalCareDetailFlag', '1');
  }
}
