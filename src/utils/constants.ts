export const WECHAT_ENV = {
  qyWechat: 1, // 企业微信
  wechat: 2, // 微信
};

// 需要使用的通用SDK接口列表
export const WX_DEFAULT_JSAPI_LIST: string[] = [
  'shareAppMessage',
  'shareWechatMessage',
];

// 埋点配置
export const POINT_TYPE: {
  [key: string]: {
    [key: string]: number;
  };
} = {
  // 埋点记录类型
  REC_TYPE: {
    SEND: 1, // 发送
    OPEN: 2, // 打开
  },

  // 分享渠道类型
  SHARE_CHANNEL: {
    FORWARD: 1, // 转发分享
    WECHAT: 2, // 微信好友分享
    POSTER_SHARE: 3, // 长按图片分享
  },
};
