import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Detail,
  Detail2,
  Detail3,
  Detail4,
  ManagerInfo,
  CustomerInfo,
  ShareInfo,
} from '../mock/mock-festival';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // 获取当前业务场景下的客户标签列表
  private labelList = 'rest/remind/labelList';
  // 获取客户标签对应的具体值
  private labelValue = 'rest/remind/labelValue';

  /**
   * 普通url的形式调用
   * @param url 路径
   * @param param 参数
   */
  post({ url, params }: { url: string; params: any }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, params, { headers }).pipe(
      map((res: any) => {
        if (res && res['rtnCod'] === '0000200') {
          return res['infBdy'];
        }
        throw new Error((res && res.errMsg) || '接口异常！');
      })
      // catchError((err) => {
      //     this.toast.hide();
      //     throw new Error(err.message || err);
      // })
    );
  }

  getDetail() {
    const detail = of(Detail4);
    return detail;
  }

  getManagerInfo(): Observable<any> {
    const managerInfo = of(ManagerInfo);
    return managerInfo;
  }

  getCustomerInfo(): Observable<Array<any>> {
    const customerInfo = of(CustomerInfo);
    return customerInfo;
  }

  getShareInfo(): Observable<any> {
    const shareInfo = of(ShareInfo);
    return shareInfo;
  }
}
