import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'festival-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  @Input() reason?: string;
  ngOnInit(): void {}
}
