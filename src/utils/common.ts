import { WECHAT_ENV } from './constants';

// 判断某元素节点下全部图片是否加载成功
export const allImgLoaded = async (element: HTMLElement) => {
  let result = false;
  const imgs = element.getElementsByTagName('img');
  const eleArr = Array.prototype.slice.call(imgs);
  const allPromise = eleArr.map((img, index) => {
    return new Promise<void>((resolve, reject) => {
      const url = imgs[index].getAttribute('src');
      const newImg = new Image();
      newImg.onload = () => {
        resolve();
      };
      newImg.onerror = () => {
        reject(new Error('图片加载失败'));
      };
      newImg.src = url || '';
    });
  });

  await Promise.all(allPromise).then(() => {
    result = true;
  });
  return result;
};

// 判断是否iphoneX
export const isIphoneX = () => {
  // 判断是不是X类型手机
  // X XS, XS Max, XR，11， 11pro，11pro max，12mini，12， 12 pro，12 pro max
  const xSeriesConfig = [
    {
      devicePixelRatio: 3,
      width: 375,
      height: 812,
    },
    {
      devicePixelRatio: 3,
      width: 414,
      height: 896,
    },
    {
      devicePixelRatio: 2,
      width: 414,
      height: 896,
    },
    {
      devicePixelRatio: 3,
      width: 315,
      height: 812,
    },
    {
      devicePixelRatio: 3,
      width: 390,
      height: 844,
    },
    {
      devicePixelRatio: 3,
      width: 428,
      height: 926,
    },
  ];
  // h5
  if (typeof window !== 'undefined' && window) {
    const isIOS = /iphone/gi.test(window.navigator.userAgent);
    if (!isIOS) return false;
    const { devicePixelRatio, screen } = window;
    const { width, height } = screen;
    return xSeriesConfig.some(
      (item) =>
        item.devicePixelRatio === devicePixelRatio &&
        item.width === width &&
        item.height === height
    );
  }
  return false;
};

// 判断当前是微信环境还是企业微信环境
export const getEnv = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  if (Boolean(ua.match(/MicroMessenger/i)) && Boolean(ua.match(/wxwork/i))) {
    // 企业微信
    return WECHAT_ENV.qyWechat;
  } else if (ua.match(/micromessenger/i)) {
    // 微信
    return WECHAT_ENV.wechat;
  }
  return;
};
