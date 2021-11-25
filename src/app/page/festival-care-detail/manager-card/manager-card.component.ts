import { Component, OnInit, Input } from '@angular/core';
import { ManagerInfo } from 'src/type/common';
@Component({
  selector: 'festival-manager-card',
  templateUrl: './manager-card.component.html',
  styleUrls: ['./manager-card.component.css'],
})
export class ManagerCardComponent implements OnInit {
  constructor() {}

  @Input() info?: ManagerInfo;
  // 字符串截取
  stringSlice = (string = '', num = 12) => {
    return string.length > num ? `${string.slice(0, num)}..` : string;
  };

  ngOnInit(): void {}
}
