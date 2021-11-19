import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-text-edit',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.css'],
})
export class TextEditComponent implements OnInit {
  @Input() layoutType: number = 1;
  @Input() fontFamily: number = 0;
  @Input() texts: string[] = [];
  @Input() customerInfo: Array<any> = [];
  @Output() onCancel = new EventEmitter();
  @Output() onSave = new EventEmitter<string[]>();

  limit: Array<Array<number>> = [[22], [11, 11], [3, 12, 3]]; // 文字限定行数
  isLimit: Array<boolean> = [false, false, false]; // 是否超出限制
  textArr: string[] = []; // 文案
  focusIndex: number = -1;
  style = {};
  contentHeight: string = '';
  constructor() {}

  cancel(): void {
    this.onCancel.emit();
  }

  save(): void {
    this.onSave.emit(this.textArr);
  }

  trackByFn(index: number, item: string) {
    return index;
  }

  changeText(e: Event, index: number): void {
    const el = e.target as HTMLTextAreaElement;
    this.checkContent(el, el.value, index).then((res) => {
      res && this.getHeight();
    });
  }

  // 校验输入的内容
  async checkContent(
    el: HTMLTextAreaElement,
    content: string = '',
    index: number
  ): Promise<boolean> {
    const { value } = el;
    content && (el.value = content);
    const { scrollHeight } = el;
    // 根节点字号
    const baseFontSize = parseFloat(
      document.querySelector('html')?.style['fontSize'] || '50'
    );
    const lineHeight = parseFloat(el?.style.lineHeight) * baseFontSize;
    // 当前输入框行数
    const line = scrollHeight / lineHeight;
    // 规定的最大行数
    const maxLine = this.limit[this.layoutType - 1][index];

    if (line > maxLine) {
      console.log(`行数超限：`, line, maxLine);
      this.isLimit[index] = true;
      // 行数超限后重新赋值原value
      el.value = this.textArr[index];
      return false;
    }
    // 行数不超限则赋值文案文案
    this.isLimit[index] = false;
    this.textArr[index] = content || value;
    return true;
  }

  // 动态生成textarea高度
  getHeight(): void {
    const container = document.querySelector('#text-edit');
    if (container) {
      const elements = container.querySelectorAll('.textarea');
      const arr = Array.prototype.slice.call(elements);
      arr.forEach((item) => {
        item.style.height = 'auto';
        const scrollHeight = item.scrollHeight;
        item.style.height = `${scrollHeight}px`;
      });
    }
  }

  //获取数据
  async getInfo(index: number): Promise<void> {
    const focusIndex = this.focusIndex;
    if (focusIndex !== -1) {
      const container = document.querySelector('#text-edit') as HTMLElement;
      const element = container?.querySelectorAll('.textarea')[
        focusIndex
      ] as HTMLTextAreaElement;
      const ind = element.selectionEnd; // 光标位置
      // TODO: 接口获取
      const value = this.customerInfo[index].value; // 需插入的值
      const text = this.textArr[focusIndex];
      const newText = text.slice(0, ind) + value + text.slice(ind); // 更新后的text
      this.checkContent(element, newText, focusIndex).then((res) => {
        if (res) {
          // 不超过规定行数则重新计算高度, 设置光标
          this.getHeight();
          element.focus();
          element.setSelectionRange(ind + value.length, ind + value.length);
        } else {
          // 超过规定行数则设置光标在原来的位置
          element.focus();
          element.setSelectionRange(ind, ind);
        }
      });
    }
  }

  // 监听当前哪个Input正在输入
  observe(e: Event) {
    const el = e.target as HTMLElement;
    if (el.getAttribute('data-index')) {
      this.focusIndex = Number(el.getAttribute('data-index'));
    } else if (el.getAttribute('data-btn')) {
      return;
    } else {
      this.focusIndex = -1;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { texts, customerInfo } = changes;
    if (texts) {
      this.textArr = [...texts.currentValue];
      timer(0).subscribe(() => {
        this.getHeight();
      });
    }
    if (customerInfo) {
      timer(0).subscribe(() => {
        const el = document.querySelector('#fixed-top');
        this.contentHeight = `calc(100% - ${(el?.clientHeight || 0) + 'px'})`;
      });
    }
  }

  ngOnInit(): void {
    this.style = {
      lineHeight: '0.46rem',
      fontFamily: this.fontFamily === 0 ? 'unset' : 'handwritings',
    };
  }
}