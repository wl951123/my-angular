// 场景详情
export interface CareDetail {
  id: number;
  name: string;
  describe?: string;
  pic?: string;
  reason?: string;
  sceneStyleList: SceneStyleList[];
  shareTitle?: string;
  shareDescribe?: string;
  sharePic?: string;
  isOpen: boolean;
  sourceId?: number;
  typeName?: string;
  sort?: number;
  createTime?: number;
}

// 样式列表
export interface SceneStyleList {
  id: number;
  name: string;
  abbrPic: string;
  pic: string;
  backgroundColor: string;
  fontColor: string;
  isOpenLogo: boolean;
  logoStyle: number;
  logoUrl?: string;
  logoLocation: string;
  isOpen: boolean;
  sceneTextList: SceneTextList[];
  layoutType: number;
}

// 文案列表
export interface SceneTextList {
  id: number;
  title: string;
  text: string[];
  fontFamily: number;
}

// 海报信息
export interface PosterInfo {
  loading: boolean;
  fail?: boolean;
  url?: string;
}

// 分享详情
export interface ShareDetail {
  id: number;
  name: string;
  texts: string[];
  backgroundColor: string;
  fontColor: string;
  isOpenLogo: boolean;
  logoUrl?: string;
  fontFamily: number;
  logoLocation: string;
  layoutType: number;
  pic: string;
  shareTitle: string;
}

// 员工信息
export interface ManagerInfo {
  name?: string;
  position?: string;
  positionShow?: boolean;
  avatar?: string;
  qrCode?: string;
  corpName?: string;
  corpNameShow?: boolean;
  dept?: string;
  deptShow?: boolean;
  userId?: string;
  desc?: string;
  descShow?: boolean;
  qrCard?: string;
  qrCardShow?: boolean;
  phone?: string;
  phoneShow?: boolean;
  phoneShowCard?: boolean;
  editQrCodeAndDesc?: boolean;
}

// 用户标签信息
export interface CustomerInfo {
  labelCd: string;
  labelNm: string;
  labelValue: string;
}
