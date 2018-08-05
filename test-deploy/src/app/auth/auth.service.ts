import { Injectable } from '@angular/core';
import { LoginRequestModel } from '../shared/models/user.model';
import { CommonConstants } from '../shared/constants/common.constant';
import { HttpService } from '../shared/services/http.service';
import { ApiUrl } from '../shared/constants/api-url.constant';
import HttpParamsHelper from '../shared/helper/http-param.helper';
import { RequestModel } from '../shared/models/request.model';
import { ResponseModel } from '../shared/models/response.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { SharedService } from '../shared/services/shared.service';
import { PageName } from '../shared/constants/routing.constant';


@Injectable()
export class AuthService {

  private base_uri = environment.BASE_URI;

  constructor(private http: HttpService, private sharedService: SharedService) { }

  loginApi(request: LoginRequestModel): Observable<any> {
    // Code here
    const url = this.base_uri + ApiUrl.LOGIN_API;
    const jsonValue = JSON.stringify(request);
    const formData = new FormData();
    formData.append('request', jsonValue);
    return this.http.postFormData(url, formData);
  }

  login(request: LoginRequestModel) {
    this.loginApi(request).subscribe(res => {
      if (res) {
        const response = JSON.stringify(res.body);
        window.localStorage.setItem(CommonConstants.user, response);
        if ( window.localStorage.getItem(CommonConstants.user) !== undefined) {
          this.sharedService.routingToPage(PageName.DASHBOARD_PAGE);
        }
      } else {
        console.log('LOXX');
      }
    });
  }

  logout() {
    // Code here
    window.localStorage.clear();
    this.sharedService.routingToPage(PageName.LOGIN_PAGE);
  }

  checkAuthentication(): boolean {
    // Code check is login
    const data = window.localStorage.getItem(CommonConstants.user);
    if ( data) {
      console.log(data);
      return true;
    } else {
      return false;
    }
  }

  setPreviousUrlBeforeLogging(url: string) {
    window.localStorage.setItem(CommonConstants.redirectUrl, url);
  }

  getPreviousUrlBeforeLogging() {
    return window.localStorage.getItem(CommonConstants.redirectUrl);
  }
}
