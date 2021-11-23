declare namespace wx {
  type OpenTagList = 'wx-open-launch-weapp' | 'wx-open-launch-app';

  type JSApiList = string;

  /**
   * config接口注入的配置信息
   */
  interface ConfigOptions {
    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    debug?: boolean;
    // 公众号AppID
    appId: string;
    // 生成签名时间戳
    timestamp: string;
    // 生成签名随即传
    nonceStr: string;
    // 签名
    signature: string;
    // 需要使用的JS接口列表
    jsApiList: JSApiList[];
    // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
    openTagList?: OpenTagList[];
  }

  interface SuccessRes {
    [key: string]: any;
  }

  /**
   *
   */
  interface callback<
    SuccessRes = object,
    FailRes = object,
    CompleteRes = object,
    CancelRes = object,
    TriggerRes = object
  > {
    success?: (res: SuccessRes) => void;
    fail?: (res: FailRes) => void;
    complete?: (res: CompleteRes) => void;
    cancel?: (res: CancelRes) => void;
    trigger?: (res: TriggerRes) => void;
  }

  /**
   * 判断当前客户端是否允许JS接口配置
   */
  interface checkJsAPIOptions extends callback {
    // 需要检测的JS接口列表，所有JS接口列表见文档,
    jsApiList: JSApiList[];
  }

  function hideOptionMenu(): void;

  // 分享内容
  interface shareDataOptions extends callback {
    // 分享标题
    title: string;
    // 分享描述
    desc?: string;
    // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    link: string;
    // 分享图标
    imgUrl: string;
  }

  /**
   * 注入权限验证配置
   * 如果要使用js-sdk必须调用该接口注入配置信息，否则无法使用
   * 当您的应用是SPA模式时，建议您在改变URL的时候调用
   * @param config
   */
  function config(config: ConfigOptions): void;

  function agentConfig(config: any): void;
  /**
   * 当config通过之后，会调用该方法
   * @param success
   */
  function ready(success: () => void): void;

  /**
   * 当config鉴权失败，会调用该方法
   * @param error
   */
  function error(error: (res: object) => void): void;

  /**
   * 调用企业微信api
   * @param {string} type JS接口名称
   * @param param 配置参数
   * @param callback 回调函数
   */
  // eslint-disable-next-line camelcase
  function invoke(
    type: string,
    param: any,
    callback: (msg: { err_msg: string }) => void
  ): void;

  function openEnterpriseChat(arg: any): void;
}

declare module 'wechat-jssdk-ts' {
  export = wx;
}
