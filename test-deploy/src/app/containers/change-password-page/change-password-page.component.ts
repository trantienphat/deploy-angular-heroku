import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { PageName } from '../../shared/constants/routing.constant';
import { AuthService } from '../../auth/auth.service';
import { User, CheckOldPasswordRequest, ChangePasswordRequest } from '../../shared/models/user.model';
import { CommonConstants } from '../../shared/constants/common.constant';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss']
})
export class ChangePasswordPageComponent implements OnInit {

  public currentUser = new User();

  public oldPassword = '';
  public newPassword = '';
  public repeatNewPassword = '';

  constructor(private sharedService: SharedService,
    private authService: AuthService,
    private toast: ToastrService,
    private userService: UserService) {
    this.checkAccessPage();
  }

  checkAccessPage() {
    if (!this.authService.checkAuthentication()) {
      this.authService.logout();
    } else {
      this.initPage();
    }
  }

  initPage() {
    const userInfo = this.sharedService.getLocalStorage(CommonConstants.userInfo);
    if (!userInfo) {
      this.authService.logout();
    } else {
      this.currentUser = userInfo;
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

  onClickListingBannedButton() {
    this.sharedService.routingToPage(PageName.LISTING_BANNED_PAGE);
  }

  onClickLogoutButton() {
    this.authService.logout();
  }

  onClickSubmitButton() {
    const checkInput = this.checkInputChangePassword();
    if (checkInput) {
      const checkOldPasswordRequest: CheckOldPasswordRequest = {
        id: this.currentUser.id,
        oldPassword: this.oldPassword
      };
      const requestCheckOld = {
        request: JSON.stringify(checkOldPasswordRequest)
      };
      this.userService.checkOldPassword(requestCheckOld).subscribe(res => {
        if (res.status === '1') {
          const changePasswordRequest: ChangePasswordRequest = {
            id: this.currentUser.id,
            password: this.newPassword
          };
          const json = JSON.stringify(changePasswordRequest);
          this.userService.updateUserInfo(changePasswordRequest).subscribe(resP => {
            if (resP) {
              this.toast.success('Thay đổi mật khẩu thành công');
              this.authService.logout();
            } else {
              this.toast.error('Mật khẩu cũ không chính xác');
            }
          }, error => {
            this.toast.error('Mật khẩu cũ không chính xác');
          });
        } else {
          this.toast.error('Mật khẩu cũ không chính xác');
        }
      }, error => {
        this.toast.error('Mật khẩu cũ không chính xác');
      });
    }
  }

  checkInputChangePassword() {
    let status = true;
    if (!this.oldPassword || !this.newPassword || !this.repeatNewPassword) {
      this.toast.error('Vui lòng không để trống mật khẩu cũ, mật khẩu mới hoặc xác nhận mật khẩu');
      status = false;
    }
    if (this.oldPassword && this.newPassword &&
      this.oldPassword === this.newPassword) {
      this.toast.error('Mật khẩu mới không được giống mật khẩu cũ');
      status = false;
    }
    if (this.newPassword !== this.repeatNewPassword && this.oldPassword) {
      this.toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp');
      status = false;
    }
    return status;
  }
}
