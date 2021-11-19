import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/service/festivalCare.service';
import { ShareDetail } from 'src/type/common';

@Component({
  selector: 'app-festival-care-preview',
  templateUrl: './festival-care-preview.html',
  styleUrls: ['./festival-care-preview.css'],
})
export class FestivalCarePreviewComponent implements OnInit {
  constructor(private heroService: HeroService) {}
  managerInfo?: any;
  style = {};
  detail?: ShareDetail;

  getManagerInfo(): void {
    this.heroService
      .getManagerInfo()
      .subscribe((val) => (this.managerInfo = val));
  }

  getShareInfo(): void {
    this.heroService.getShareInfo().subscribe((val: ShareDetail) => {
      val.texts.forEach((item: string, index: number) => {
        val.texts[index] = this.formatText(item);
        this.detail = val;
      });
      document.title = this.formatText(val.shareTitle);
    });
  }

  // 经理名，机构名文本替换
  formatText = (text = '') => {
    const { name, corpName } = this.managerInfo;
    return text.replace(/\$name\$/g, name).replace(/\$corp\$/g, corpName);
  };

  ngOnInit(): void {
    this.getManagerInfo();
    this.getShareInfo();
    this.style = {
      color: this.detail?.fontColor,
      fontFamily: this.detail?.fontFamily === 0 ? 'unset' : 'handwritings',
    };
  }
}
