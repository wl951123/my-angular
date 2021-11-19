import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-text-layout',
  templateUrl: './text-layout.component.html',
  styleUrls: ['./text-layout.component.css'],
})
export class TextLayoutComponent implements OnInit {
  @Input() style = {};
  @Input() layoutType: number = 1;
  @Input() texts: string[] = [];
  @Output() editEvent = new EventEmitter();

  constructor() {}

  onEdit(): void {
    this.editEvent.emit();
  }

  ngOnInit(): void {}
}
