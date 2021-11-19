import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
/**
 * 发送请求的公共服务
 */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  /**
   * 普通url的形式调用
   * @param url 路径
   * @param param 参数
   */
  post({ url, params }: { url: string; params: any }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post(url, params, { headers }).pipe(
      map((res: any) => {
        if (res && res['rtnCod'] === '0000200') {
          return res['infBdy'];
        }
        throw new Error((res && res.errMsg) || '接口异常！');
      })
    );
  }
}
