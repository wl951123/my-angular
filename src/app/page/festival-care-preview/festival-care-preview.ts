import { Component, OnInit } from '@angular/core';
import { FestivalCareService } from 'src/services/festivalCare.service';
import { ShareDetail, ManagerInfo } from 'src/type/common';
import { parse, ParsedQuery } from 'query-string';

@Component({
  selector: 'festival-festival-care-preview',
  templateUrl: './festival-care-preview.html',
  styleUrls: ['./festival-care-preview.css'],
})
export class FestivalCarePreviewComponent implements OnInit {
  constructor(private festivalCareService: FestivalCareService) {}
  managerInfo = {} as ManagerInfo;
  style = {};
  detail?: ShareDetail;
  linkParameters: ParsedQuery<string> = parse(window.location.search);

  getManagerInfo(): void {
    this.festivalCareService
      .getManagerInfo({ userId: this.linkParameters['userId'] })
      .subscribe((val) => (this.managerInfo = val[0]));
  }

  getShareInfo(): void {
    this.festivalCareService
      .getShareInfo({ shareId: this.linkParameters['shareId'] })
      .subscribe((val: ShareDetail[]) => {
        val[0].texts.forEach((item: string, index: number) => {
          val[0].texts[index] = this.formatText(item);
          this.detail = val[0];
        });
        document.title = this.formatText(val[0].shareTitle);
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
    sessionStorage.setItem('unionId', 'hhhhh');
    this.getManagerInfo();
    this.getShareInfo();
    this.trackPosterData();
    this.style = {
      color: this.detail?.fontColor,
      fontFamily: this.detail?.fontFamily === 0 ? 'unset' : 'handwritings',
    };
  }
}
