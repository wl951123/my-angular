export interface CareDetail {
  id: number;
  name: string;
  describe?: string;
  pic?: string;
  reason?: string;
  sceneStyleList: SceneStyleList[];
  relationType?: string;
  shareTitle?: string;
  shareDescribe?: string;
  sharePic?: string;
  corpBanner?: {};
  isOpenLike?: boolean;
  isRecommend?: boolean;
  isOpen: boolean;
  sourceId?: number;
  typeName?: string;
  recommendTag?: number;
  sort?: number;
  createTime?: number;
}

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
  sceneTextList: {
    id: number;
    title: string;
    text: string[];
    fontFamily: number;
  }[];
  layoutType: number;
}

export interface SceneTextList {
  id: number;
  title: string;
  text: string[];
  fontFamily: number;
}

export interface PosterInfo {
  loading: boolean;
  fail?: boolean;
  url?: string;
}

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
