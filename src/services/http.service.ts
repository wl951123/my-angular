import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// interface ResponseType {
//   rtnCod: string;
//   errMsg: string;
//   infBdy: any;
//   returnInfo: {
//     returnCode: string;
//     errorMsg: string;
//   };
// }
/**
 * 发送请求的公共服务
 */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  post({ url, params }: { url: string; params: any }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post(url, params, { headers }).pipe(
      map((res: any) => {
        if (res && res['rtnCod'] === '0000200') {
          return res['infBdy'];
        }
        throw new Error(
          (res.returnInfo && res.returnInfo.errorMsg) || '接口异常！'
        );
      })
    );
  }

  get({ url, params }: { url: string; params: any }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.get(url, { headers, params }).pipe(
      map((res: any) => {
        if (res && res['rtnCod'] === '0000200') {
          return res['infBdy'];
        }
        throw new Error(
          (res.returnInfo && res.returnInfo.errorMsg) || '接口异常！'
        );
      })
    );
  }
}
