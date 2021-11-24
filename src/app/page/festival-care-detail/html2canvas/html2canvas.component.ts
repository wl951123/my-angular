import { Component, OnInit, Input } from '@angular/core';
import { SceneStyleList, SceneTextList, ManagerInfo } from 'src/type/common';

@Component({
  selector: 'festival-html2canvas',
  templateUrl: './html2canvas.component.html',
  styleUrls: ['./html2canvas.component.css'],
})
export class Html2canvasComponent implements OnInit {
  width: number = 350;
  constructor() {}
  @Input() sceneStyle?: SceneStyleList;
  @Input() sceneText?: SceneTextList;
  @Input() managerInfo?: ManagerInfo;
  setStyle() {
    return {
      color: this.sceneStyle?.fontColor,
      fontFamily: this.sceneText?.fontFamily === 0 ? 'unset' : 'handwritings',
    };
  }
  ngOnInit(): void {
    this.width = screen.width;
  }
}
