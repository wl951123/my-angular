import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpService } from './http.service';
import {
  CareDetail,
  ShareDetail,
  CustomerInfo,
  ManagerInfo,
} from '../type/common';

@Injectable({
  providedIn: 'root',
})
export class FestivalCareService {
  constructor(private httpService: HttpService) {}

  // 获取当前业务场景下的客户标签列表
  private labelList = 'api/careScene/rest/remind/labelList';

  // 获取当前模板信息
  private festivalCareDetail = 'api/careScene/information';

  // 员工个人信息
  private userInfo = 'api/careScene/staffCard';

  // 分享快照id
  private shareId = 'api/careScene/share';

  // 根据id获取分享详情
  private shareInfo = 'api/careScene/shareInfo';

  getDetail(params: any): Observable<CareDetail[]> {
    return this.httpService.get({ url: this.festivalCareDetail, params });
  }

  getManagerInfo(params: any): Observable<ManagerInfo[]> {
    return this.httpService.get({ url: this.userInfo, params });
  }

  getCustomerInfo(params: any): Observable<Array<CustomerInfo>> {
    return this.httpService.post({ url: this.labelList, params });
  }

  getShareId(params: any): Observable<{ shareId: Number }[]> {
    return this.httpService.post({ url: this.shareId, params });
  }

  getShareInfo(params: any): Observable<ShareDetail[]> {
    return this.httpService.get({ url: this.shareInfo, params });
  }
}
