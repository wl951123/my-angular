import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CareDetail, SceneStyleList, SceneTextList } from 'src/type/common';

@Component({
  selector: 'festival-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  constructor() {}
  @Input() detail?: CareDetail;
  @Input() isIphoneX?: boolean;
  @Input() isEditing: boolean = false;
  @Input() sceneStyle?: SceneStyleList;
  @Input() sceneText?: SceneTextList;
  @Output() editEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  @Output() setSceneStyle = new EventEmitter<SceneStyleList>();
  @Output() setSceneText = new EventEmitter<SceneTextList>();

  activeIndex: number = 0;
  activeIndex2: number = 0;
  onChange = (type: 'activeIndex' | 'activeIndex2', value: number): void => {
    if (!this.detail) return;
    this[type] = value;
    if (type === 'activeIndex') {
      // 切换样式时，自动切换第一个文案
      this.activeIndex2 = 0;
      this.setSceneStyle.emit(this.detail.sceneStyleList[value]);
      this.setSceneText.emit(
        this.detail.sceneStyleList[value].sceneTextList[0]
      );
    } else {
      this.setSceneText.emit(
        this.detail.sceneStyleList[this.activeIndex].sceneTextList[value]
      );
    }
  };

  onEdit(): void {
    this.editEvent.emit();
  }

  onCancel(): void {
    this.cancelEvent.emit();
  }

  setStyle() {
    return {
      transform: `scale(${6.9 / 7.5})`,
      transformOrigin: 'left top',
      color: this.sceneStyle?.fontColor,
      fontFamily: this.sceneText?.fontFamily === 0 ? 'unset' : 'handwritings',
    };
  }

  ngOnInit(): void {}
}
