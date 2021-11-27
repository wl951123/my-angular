import { Component, OnInit } from '@angular/core';
import { FestivalCareService } from 'src/services/festivalCare.service';
import { ShareDetail, ManagerInfo } from 'src/type/common';
import { parse, ParsedQuery } from 'query-string';
import { ToastService } from 'ng-zorro-antd-mobile';
@Component({
  selector: 'festival-festival-care-preview',
  templateUrl: './festival-care-preview.html',
  styleUrls: ['./festival-care-preview.css'],
})
export class FestivalCarePreviewComponent implements OnInit {
  constructor(
    private festivalCareService: FestivalCareService,
    public _toast: ToastService
  ) {}
  managerInfo = {} as ManagerInfo;
  style = {};
  detail?: ShareDetail;
  linkParameters: ParsedQuery<string> = parse(
    window.location.href.split('?')[1]
  );

  getManagerInfo(): void {
    this.festivalCareService
      .getManagerInfo({ userId: this.linkParameters['userId'] })
      .subscribe((val) => (this.managerInfo = val[0]));
  }

  getShareInfo(): void {
    this.festivalCareService
      .getShareInfo({ shareId: this.linkParameters['shareId'] })
      .subscribe((val: ShareDetail[]) => {
        const data = val[0];
        if (data?.id) {
          data.texts?.forEach((item: string, index: number) => {
            data.texts[index] = this.formatText(item);
          });
          this.detail = data;
          document.title = this.formatText(data.shareTitle);
          this.style = {
            color: data?.fontColor,
            fontFamily: data?.fontFamily === 0 ? 'unset' : 'handwritings',
          };
        } else {
          this._toast.fail('分享不存在');
        }
      });
  }

  // 经理名，机构名文本替换
  formatText = (text = '') => {
    const { name = '', corpName = '' } = this.managerInfo;
    return text.replace(/\$name\$/g, name).replace(/\$corp\$/g, corpName);
  };

  // 埋点
  trackPosterData(): void {
    const params = {
      userId: this.linkParameters['userId'],
      unionId: sessionStorage.getItem('unionId'),
      time: new Date().getTime(),
      typeId: this.linkParameters['typeId'],
      busId: this.linkParameters['busId'],
    };
  }

  async ngOnInit(): Promise<void> {
    // TODO: 模拟客户unionId获取
    sessionStorage.setItem('unionId', 'hhhhh');
    this.getManagerInfo();
    this.getShareInfo();
    this.trackPosterData();
  }
}
