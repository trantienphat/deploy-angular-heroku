import { Injectable } from '@angular/core';
import { LoginRequestModel, GetUserInfoRequest, LoginResponseModel } from '../shared/models/user.model';
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
import { UserService } from '../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


@Injectable()
export class AuthService {

  private base_uri = environment.BASE_URI;
  public loginSubcription = new Subject<any>();

  constructor(private http: HttpService,
    private sharedService: SharedService,
    private toast: ToastrService) { }

  loginApi(request: LoginRequestModel): Observable<any> {
    const url = this.base_uri + ApiUrl.LOGIN_API;
    const jsonValue = JSON.stringify(request);
    const formData = new FormData();
    formData.append('request', jsonValue);
    return this.http.postFormData(url, formData);
  }

  login(request: LoginRequestModel) {
    this.loginApi(request).subscribe((res) => {
      if (res) {
        const response: LoginResponseModel = res.body;
        if ( response !== undefined) {
          this.sharedService.setLocalStorage(CommonConstants.user, response);
          this.loginSubcription.next();
        } else {
          this.toast.error('Sai tài khoản hoặc mật khẩu');
        }
      } else {
        this.toast.error('Sai tài khoản hoặc mật khẩu');
      }
    }, error => {
      this.toast.error('Sai tài khoản hoặc mật khẩu');
    });
  }

  logout() {
    this.sharedService.clearLocalStorage();
    this.sharedService.routingToPage(PageName.LOGIN_PAGE);
  }

  checkAuthentication(): boolean {
    const data: LoginResponseModel = this.sharedService.getLocalStorage(CommonConstants.user);
    if (data && data.status === '1') {
      return true;
    } else {
      return false;
    }
  }

  setPreviousUrlBeforeLogging(url: string) {
    this.sharedService.setLocalStorage(CommonConstants.redirectUrl, url);
  }

  getPreviousUrlBeforeLogging(): string {
    return this.sharedService.getLocalStorage(CommonConstants.redirectUrl);
  }
}
