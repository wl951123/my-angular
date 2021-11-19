import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/service/festivalCare.service';
import {
  CareDetail,
  SceneStyleList,
  SceneTextList,
  PosterInfo,
} from 'src/type/common';
import { isIphoneX, allImgLoaded } from 'src/utils/common';
import html2canvas from 'html2canvas';
import { timer } from 'rxjs';

@Component({
  selector: 'app-festival-care-detail',
  templateUrl: './festival-care-detail.html',
  styleUrls: ['./festival-care-detail.css'],
})
export class FestivalCareDetailComponent implements OnInit {
  constructor(private heroService: HeroService) {}
  isFirstEnter: boolean = !localStorage.getItem('festivalCareDetailFlag');
  detail?: CareDetail;
  isIphoneX: boolean = false;
  isEditing: boolean = false;
  managerInfo: any = {};
  customerInfo: Array<any> = [];
  sceneStyle?: SceneStyleList;
  sceneText?: SceneTextList;
  grid: PosterInfo = { loading: true };
  showModel: boolean = false;
  isShare: boolean = false;
  isLoading: boolean = true;
  timerTouchStart: any = null;
  style = {
    height: '100vh',
    overflow: 'hidden',
    filter: 'blur(3px)',
  };

  // 设置样式
  setSceneStyle(e: SceneStyleList): void {
    this.sceneStyle = e;
  }

  // 设置文案
  setSceneText(e: SceneTextList): void {
    const { name, corpName } = this.managerInfo;
    e.text = e.text.map((item) =>
      item.replace(/\$name\$/g, name).replace(/\$corp\$/g, corpName)
    );
    this.sceneText = e;
  }

  // 编辑
  onEdit(): void {
    this.isEditing = true;
  }

  // 取消编辑
  onCancel(): void {
    this.isEditing = false;
  }

  // 关闭首次进入的插图
  onCloseMask(): void {
    this.isFirstEnter = false;
  }

  // 确定编辑内容
  onSave(e: string[]): void {
    // TODO: 敏感词校验

    this.sceneText && (this.sceneText.text = e);
    this.isEditing = false;
  }

  // 分享
  changeShare(): void {
    this.isShare = !this.isShare;
  }

  touchStart = () => {
    console.log('start');
    this.timerTouchStart = setTimeout(() => {
      this.trackPosterData();
    }, 400);
  };

  touchEnd = () => {
    console.log('end');
    clearTimeout(this.timerTouchStart);
  };

  // 埋点
  trackPosterData(): void {}
  // 分享海报
  onCreatePoster(): void {
    timer(300).subscribe(() => {
      const container = document.querySelector('#poster-canvas') as HTMLElement;

      const grid = this.grid;
      allImgLoaded(container)
        .then(() => {
          html2canvas(container, {
            allowTaint: true,
            useCORS: true,
            scrollY: 0,
            height: container.clientHeight,
          }).then((canvas: HTMLCanvasElement) => {
            const base64ImgSrc = canvas.toDataURL('image/jpeg', 1.0);
            grid.loading = false;
            grid.url = base64ImgSrc;
          });
        })
        .catch(() => {
          grid.loading = false;
          grid.fail = true;
        });
    });
    this.showModel = true;
  }

  closeModel(): void {
    this.showModel = false;
    this.grid = { loading: true };
  }

  // 获取节点关怀详情
  getDetail(): void {
    this.heroService.getDetail().subscribe((detail) => {
      this.detail = detail.retdata;
      this.setSceneStyle(detail.retdata.sceneStyleList[0]);
      this.setSceneText(detail.retdata.sceneStyleList[0]?.sceneTextList[0]);
      document.title = this.detail.name;
      this.isLoading = false;
    });
  }

  getIsIphoneX(): void {
    this.isIphoneX = isIphoneX();
  }

  getManagerInfo(): void {
    this.heroService
      .getManagerInfo()
      .subscribe((val) => (this.managerInfo = val));
  }

  getCustomerInfo(): void {
    this.heroService
      .getCustomerInfo()
      .subscribe((val) => (this.customerInfo = val));
  }

  ngOnInit(): void {
    localStorage.setItem('festivalCareDetailFlag', '1');
    this.getManagerInfo();
    this.getDetail();
    this.getIsIphoneX();
    this.getCustomerInfo();
  }
}
