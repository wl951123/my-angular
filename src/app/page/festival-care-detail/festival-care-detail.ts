import { Component, OnInit } from '@angular/core';
import { FestivalCareService } from 'src/services/festivalCare.service';
import {
  CareDetail,
  SceneStyleList,
  SceneTextList,
  PosterInfo,
  ManagerInfo,
  CustomerInfo,
} from 'src/type/common';
import { isIphoneX, allImgLoaded } from 'src/utils/common';
import html2canvas from 'html2canvas';
import { timer } from 'rxjs';
import { parse, ParsedQuery, stringify } from 'query-string';
import {
  POINT_TYPE,
  WECHAT_ENV,
  WX_DEFAULT_JSAPI_LIST,
} from '../../../utils/constants';
import { getEnv } from 'src/utils/common';
import { ToastService } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-festival-care-detail',
  templateUrl: './festival-care-detail.html',
  styleUrls: ['./festival-care-detail.css'],
})
export class FestivalCareDetailComponent implements OnInit {
  constructor(
    private festivalCareService: FestivalCareService,
    public _toast: ToastService
  ) {}
  isFirstEnter: boolean = !localStorage.getItem('festivalCareDetailFlag');
  detail = {} as CareDetail;
  isIphoneX: boolean = false;
  isEditing: boolean = false;
  managerInfo = {} as ManagerInfo;
  customerInfo: Array<CustomerInfo> = [];
  sceneStyle = {} as SceneStyleList;
  sceneText = {} as SceneTextList;
  grid: PosterInfo = { loading: true };
  showModel: boolean = false;
  isShare: boolean = false;
  isLoading: boolean = true;
  timerTouchStart: any = null;
  linkParameters: ParsedQuery<string> = parse(
    window.location.href.split('?')[1]
  );
  shareId: Number | string = '';
  wxSDKParams = {} as { [key: string]: string };
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
    e.text = e.text.map((item) => this.formatText(item));
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
    this.sceneText &&
      (this.sceneText.text = e.map((item) => this.formatText(item)));
    this.isEditing = false;
  }

  // 分享
  changeShare(): void {
    if (!this.isShare) {
      // TODO: 测试时注释
      // if (getEnv() !== WECHAT_ENV.qyWechat) {
      //   this._toast.info('请在企业微信下使用');
      //   return;
      // }
      const { isOpen, sharePic, shareDescribe, shareTitle, name } = this.detail;
      const {
        backgroundColor,
        fontColor,
        logoLocation,
        logoStyle,
        logoUrl,
        isOpenLogo,
        pic,
        layoutType,
      } = this.sceneStyle;
      const { fontFamily, text } = this.sceneText;
      const params = {
        templateId: this.linkParameters['id'],
        userId: sessionStorage.getItem('userId'),
        backgroundColor,
        fontColor,
        logoLocation,
        logoStyle,
        logoUrl,
        isOpenLogo,
        pic,
        layoutType,
        isOpen,
        sharePic,
        shareDescribe,
        shareTitle,
        name,
        fontFamily,
        texts: text,
      };
      // 获取分享的id
      this.festivalCareService.getShareId(params).subscribe((res) => {
        this.shareId = res[0].shareId;
        this.isShare = true;
      });
    } else {
      this.isShare = false;
    }
  }

  // 长按图片0.4秒后调用埋点
  touchStart = () => {
    console.log('start');
    this.timerTouchStart = setTimeout(() => {
      this.trackPosterData('POSTER_SHARE');
    }, 400);
  };

  touchEnd = () => {
    console.log('end');
    clearTimeout(this.timerTouchStart);
  };

  onShare = async (e: string) => {
    const { shareTitle, shareDescribe, sharePic } = this.detail;
    const pic = this.sceneStyle?.pic;
    const type = e === 'FORWARD' ? 'shareAppMessage' : 'shareWechatMessage';

    const link =
      // TODO: 须配置的链接地址
      window.location.origin +
      '/festivalCarePreview?' +
      stringify({
        shareId: this.shareId,
        userId: sessionStorage.getItem('userId'),
        busId: this.linkParameters['busId'],
        typeId: this.linkParameters['typeId'],
      });
    console.log('%c  link:', 'color: #0e93e0;background: #aaefe5;', link);
    wx.invoke &&
      wx.invoke(
        type,
        {
          title: this.formatText(shareTitle),
          desc: this.formatText(shareDescribe),
          link,
          imgUrl: sharePic || pic,
        },
        (res) => {
          console.log(`wx.invoke ${type} ===>`, res);
          if (res.err_msg === `${type}:ok`) {
            // 分享成功埋点
            this.trackPosterData(e);
          }
        }
      );
  };

  // 埋点
  trackPosterData(type: string): void {
    // 经理userid、时间、链接/图片、分享渠道（选链接时）、typeid、busId
    const params = {
      userId: sessionStorage.getItem('userId') || '',
      time: new Date().getTime(),
      link: window.location.href,
      shareChannel: POINT_TYPE['SHARE_CHANNEL'][type] || '',
      typeId: this.linkParameters['typeId'],
      busId: this.linkParameters['busId'],
    };
    // TODO: 调用埋点接口
  }

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

  // 经理名，机构名文本替换
  formatText = (text = '') => {
    const { name = '', corpName = '' } = this.managerInfo;
    return text.replace(/\$name\$/g, name).replace(/\$corp\$/g, corpName);
  };

  // 获取节点关怀详情
  getDetail(): void {
    const templateId = this.linkParameters['id'];
    if (templateId) {
      this.isLoading && this._toast.loading('加载中...', 0);
      this.festivalCareService
        .getDetail({
          templateId,
        })
        .subscribe((detail) => {
          if (detail[0]?.id) {
            this.detail = detail[0];
            this.setSceneStyle(detail[0].sceneStyleList[0]);
            this.setSceneText(detail[0].sceneStyleList[0]?.sceneTextList[0]);
            document.title = this.detail?.name || '节点关怀';
          } else {
            this.detail = { isOpen: false } as CareDetail;
          }
          this._toast.hide();
          this.isLoading = false;
        });
    }
  }

  getIsIphoneX(): void {
    this.isIphoneX = isIphoneX();
  }

  // 获取经理卡片信息
  getManagerInfo(): void {
    this.festivalCareService
      .getManagerInfo({ userId: sessionStorage.getItem('userId') })
      .subscribe((val) => (this.managerInfo = val[0]));
  }

  // 获取用户标签信息
  getCustomerInfo(): void {
    this.festivalCareService
      .getCustomerInfo({
        busId: this.linkParameters['busId'],
        externalUserId: this.linkParameters['external_userid'],
      })
      .subscribe((val) => (this.customerInfo = val));
  }

  /**
   *微信JS-SDK 初始化
   *
   * @param {IStrValObjProps} wxSDKParams 全局微信JS-SDK授权参数
   * @memberof HomePage
   */
  wxSDKInit() {
    // 只有在企业微信下,才进行微信JS-SDK鉴权
    if (getEnv() !== WECHAT_ENV.qyWechat) return;
    // TODO: 签名获取的本地存储 暂时先模拟
    const wxSDKParams = sessionStorage.getItem('wxSDKParams') || '{}';
    this.wxSDKParams = JSON.parse(wxSDKParams);
    const { appId, timestamp, nonceStr, signature } = this.wxSDKParams;
    const obj = {
      beta: true,
      debug: false,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList: [...WX_DEFAULT_JSAPI_LIST],
      success: (result: object) => {},
      fail: (error: Error) => {
        this._toast.info('微信接口授权失败:' + JSON.stringify(error));
      },
    };
    wx.config(obj);
    wx.ready(() => {
      // 只保留基础菜单
      wx.hideOptionMenu();
      this.wxAgentConfigInit();
    });
  }

  // 企业微信JS-SDK需要代理配置的接口初始化
  wxAgentConfigInit() {
    const { appId, agentid, timestamp, nonceStr, agentSignature } =
      this.wxSDKParams;
    wx.agentConfig({
      corpid: appId, // 必填，企业微信的corpid，必须与当前登录的企业一致
      agentid, // 必填，企业微信的应用id （e.g. 1000247）
      timestamp, // 必填，生成签名的时间戳
      nonceStr, // 必填，生成签名的随机串
      signature: agentSignature, // 必填，签名，见附录-JS-SDK使用权限签名算法
      jsApiList: WX_DEFAULT_JSAPI_LIST, // 必填，传入需要使用的接口名称
      success: (result: object) => {
        console.log('agentconfig 初始化成功');
      },
      fail: (error: Error) => {
        this._toast.info('微信接口授权失败:' + JSON.stringify(error));
      },
    });
  }

  ngOnInit(): void {
    // 用户首次进入的操作提示
    localStorage.setItem('festivalCareDetailFlag', '1');
    // TODO: 模拟userId, 正式上线要删掉
    sessionStorage.setItem('userId', 'wanlong');
    try {
      this.wxSDKInit();
    } catch (error) {}
    this.getIsIphoneX();
    this.getManagerInfo();
    this.getDetail();
    this.getCustomerInfo();
  }
}
