import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastService } from 'ng-zorro-antd-mobile';

// 这里建议和后端确认下是不是这些code是固定的这些含义，如果不是自行修改或者删除
enum RTNCOD {
  RMI_SUCCESS_RTNCOD = 'SUC0000', // rmi.do的成功cod
  REST_SUCCESS_RTNCOD = '0000200', // resuful的成功cod
  VRF_PRIV_FAIL_RTNCOD = '0000401', // 鉴权失败
  NO_AUTH_RTNCOD = '0000403', // 权限不足
  NO_RES_RTNCOD = '0000404', // 找不到资源
  SYS_XPT_RTNCOD = '0000500', // 系统操作异常
}

const RTNCOD_MES: { [key: string]: string } = {
  [RTNCOD.RMI_SUCCESS_RTNCOD]: '成功！',
  [RTNCOD.REST_SUCCESS_RTNCOD]: '成功！',
  [RTNCOD.VRF_PRIV_FAIL_RTNCOD]: '鉴权失败！',
  [RTNCOD.NO_AUTH_RTNCOD]: '权限不足！',
  [RTNCOD.NO_RES_RTNCOD]: '资源404！',
  [RTNCOD.SYS_XPT_RTNCOD]: '系统操作异常！',
};

/**
 * 各个业务场景自定义的一些接口codes
 */
const BUSINESS_CODES: string[] = [];

const COMMON_ERROR_MES = '接口异常！';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(public antdToast: ToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        // 你可能会期望 intercept() 和 handle() 方法会像大多数 HttpClient 中的方法那样返回 HttpResponse<any> 的可观察对象。
        // 然而并没有，它们返回的是 HttpEvent<any> 的可观察对象。
        // 这是因为拦截器工作的层级比那些 HttpClient 方法更低一些。每个 HTTP 请求都可能会生成很多个事件，包括上传和下载的进度事件。 实际上，HttpResponse 类本身就是一个事件，它的类型（type）是 HttpEventType.HttpResponseEvent。
        // 很多拦截器只关心发出的请求，而对 next.handle() 返回的事件流不会做任何修改。
        // 但那些要检查和修改来自 next.handle() 的响应体的拦截器希望看到所有这些事件。 所以，你的拦截器应该返回你没碰过的所有事件，除非你有充分的理由不这么做。
        if (event instanceof HttpResponse) {
          // console.log('event', event);
          switch (event.status) {
            case 200:
              this.httpSuccess(req, event);
              break;
            case 404:
              throw new Error('http请求404！');
            case 500:
              throw new Error('http请求500，服务器异常！');
            default:
              break;
          }
        }
      })
      // catchError(err => {
      //     console.error(err.message || err);
      //     // throw new Error(err.message || err);
      //     return of(null);
      //     // empty 會給我們一個空的 observable，如果我們订阅这个 observable ， 它会立即响应complete 函数。
      //     // return empty();
      // })
    );
  }
  httpSuccess(req: HttpRequest<any>, event: HttpResponse<any>): void {
    /**
     * 以下都是基于http请求是200成功的情况下
     * rtnCod是restful请求方式
     * RTNCOD是rmi.do作业条请求方式
     */
    if (event.body && (event.body.RTNCOD || event.body.rtnCod || event.body.ERRCOD)) {
      const code = event.body.RTNCOD || event.body.rtnCod || event.body.ERRCOD;
      if (code === RTNCOD.REST_SUCCESS_RTNCOD || code === RTNCOD.RMI_SUCCESS_RTNCOD) {
        return;
      }

      // 这里如果不想toast出提示，就注释掉，需要的话就自行配置BUSINESS_CODES，这样toast就不需要各个组件去单独处理了
      if (BUSINESS_CODES.includes(code) || event.body['rtnCod'] !== '0000200') {
        // 直接提示出配置的这些code的后端接口的异常提示信息（这个需要和后端去约定）
        this.showToast(event.body.ERRMSG || event.body.errMsg);
        console.error(`调用path: ${req.url} ${code} ${event.body.ERRMSG}`);
      } else if (Object.values(RTNCOD).includes(code) && RTNCOD_MES[code]) {
        // 提示出固定的一些异常提示信息
        this.showToast(RTNCOD_MES[code]);
        console.error(`调用path: ${req.url} ${RTNCOD_MES[code]}`);
      } else {
        this.showToast(COMMON_ERROR_MES);
        console.error(`调用path: ${req.url} ${COMMON_ERROR_MES}`);
      }
    }
  }
  showToast(msg: string): void {
    setTimeout(() => {
      this.antdToast.hide();
      this.antdToast.info(msg);
    }, 0);
  }
}
