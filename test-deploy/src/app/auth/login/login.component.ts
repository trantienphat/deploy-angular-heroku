import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { PageName } from '../../shared/constants/routing.constant';
import { LoginRequestModel, GetUserInfoRequest, LoginResponseModel } from '../../shared/models/user.model';
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

  public subscriptionLogin: Subscription;
  public loginRequest = new LoginRequestModel();

  public redirectUrl = '';

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
      this.redirectUrl = this.sharedService.getLocalStorage(CommonConstants.redirectUrl);
      if (this.redirectUrl) {
        this.sharedService.routingToPage(this.redirectUrl); // Routing to the previous page if was login
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
        const currentUser: LoginResponseModel = this.sharedService.getLocalStorage(CommonConstants.user);
        if (currentUser && currentUser.status === '1') {
          this.getCurrentUserInfo(currentUser.id);
        } else {
          this.sharedService.clearLocalStorage();
          this.toast.error('Sai tài khoản hoặc mật khẩu');
        }
      }, error => {
        this.sharedService.clearLocalStorage();
        this.toast.error('Sai tài khoản hoặc mật khẩu');
      });
    }

  }

  getCurrentUserInfo(_id: string) {
    const request: GetUserInfoRequest = {
      id: _id
    };
    this.userService.getUserInfo(request).subscribe(res => {
      if (res !== []) {
        const userInfo = res[0];
        this.sharedService.setLocalStorage(CommonConstants.userInfo, userInfo);
        this.sharedService.routingToPage(PageName.DASHBOARD_PAGE);
      }
    });
  }
}
