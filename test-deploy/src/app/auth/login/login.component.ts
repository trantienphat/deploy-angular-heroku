import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { PageName } from '../../shared/constants/routing.constant';
import { LoginRequestModel, GetUserInfoRequest } from '../../shared/models/user.model';
import { AuthService } from '../auth.service';
import { CommonConstants } from '../../shared/constants/common.constant';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginRequest = new LoginRequestModel();

  public redirectUrl = '';

  public subscriptionLogin: Subscription;

  constructor(private sharedService: SharedService,
    private authService: AuthService,
    private userService: UserService,
    private toast: ToastrService) {
    this.checkAccessPage();
  }

  checkAccessPage() {
    if (!this.authService.checkAuthentication()) {
      this.authService.logout();
    } else {
      this.redirectUrl = window.localStorage.getItem(CommonConstants.redirectUrl);
      if (this.redirectUrl) {
        this.sharedService.routingToPage(this.redirectUrl);
      } else {
        this.sharedService.routingToPage(PageName.DASHBOARD_PAGE);
      }

    }
  }

  ngOnInit() {
  }

  onClickSignInButton() {
    if (!this.loginRequest.email || !this.loginRequest.password) {
      this.toast.error('Vui lòng không để trống tài khoản hoặc mật khẩu');
    } else {
      this.authService.login(this.loginRequest);
      this.subscriptionLogin = this.authService.loginSubcription.subscribe(res => {
        const currentUser = JSON.parse(window.localStorage.getItem(CommonConstants.user));
        if (currentUser.status == 1) {
          this.getCurrentUserInfo(currentUser.id);
        } else {
          window.localStorage.clear();
          this.toast.error('Sai tài khoản hoặc mật khẩu');
        }
      }, error => {
        window.localStorage.clear();
        this.toast.error('Sai tài khoản hoặc mật khẩu');
      });
    }

  }

  getCurrentUserInfo(_id: string) {
    const request: GetUserInfoRequest = {
      id: _id
    };
    this.userService.getUserInfo(request).subscribe(res => {
      const stringValue = JSON.stringify(res[0]);
      window.localStorage.setItem(CommonConstants.userInfo, stringValue);
      this.sharedService.routingToPage(PageName.DASHBOARD_PAGE);
    });
  }
}
