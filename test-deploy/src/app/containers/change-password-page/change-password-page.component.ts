import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { PageName } from '../../shared/constants/routing.constant';
import { AuthService } from '../../auth/auth.service';
import { User, ChangePasswordRequest } from '../../shared/models/user.model';
import { CommonConstants } from '../../shared/constants/common.constant';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss']
})
export class ChangePasswordPageComponent implements OnInit {

  public user = new User();

  public changePasswordRequest = new ChangePasswordRequest();
  public repeatNewPassword;

  constructor(private sharedService: SharedService,
    private authService: AuthService,
    private toast: ToastrService,
    private userService: UserService) {
    this.checkAccessPage();
   }

  checkAccessPage() {
    if ( !this.authService.checkAuthentication()) {
      this.authService.logout();
    } else {
      this.initPage();
    }
  }

  initPage() {
    const _user = JSON.parse(window.localStorage.getItem(CommonConstants.userInfo));
    if ( !_user) {
      this.authService.logout();
    } else {
      this.user = _user;
    }
  }

  ngOnInit() {
  }

  onClickAccountButton() {
    this.sharedService.routingToPage(PageName.ACCOUNT_PAGE);
  }

  onClickChangePasswordButton() {
    this.sharedService.routingToPage(PageName.CHANGE_PASSWORD_PAGE);
  }

  onClickDashboardButton() {
    this.sharedService.routingToPage(PageName.DASHBOARD_PAGE);
  }

  onClickListingTutorsButton() {
    this.sharedService.routingToPage(PageName.LISTING_TUTOR_PAGE);
  }

  onClickListingStudentsButton() {
    this.sharedService.routingToPage(PageName.LISTING_STUDENT_PAGE);
  }

  onClickListingRequisitionsButton() {
    this.sharedService.routingToPage(PageName.LISTING_REQUISITION_PAGE);
  }

  onClickLogoutButton() {
    // Code here
    this.authService.logout();
  }

  onClickSubmitButton() {
    if ( !this.changePasswordRequest.oldPassword || !this.changePasswordRequest.newPassword || !this.repeatNewPassword) {
      this.toast.error('Vui lòng không để trống mật khẩu cũ, mật khẩu mới và xác nhận mật khẩu');
    }
    if (this.changePasswordRequest.oldPassword && this.changePasswordRequest.newPassword &&
      this.changePasswordRequest.oldPassword === this.changePasswordRequest.newPassword) {
      this.toast.error('Mật khẩu mới không được giống mật khẩu cũ');
    }
    if (this.changePasswordRequest.newPassword !== this.repeatNewPassword && this.changePasswordRequest.oldPassword ) {
      this.toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp');
    }
  }
}
