import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { PageName } from '../../../shared/constants/routing.constant';
import { AuthService } from '../../../auth/auth.service';
import { User, GetBannedUserRequest, BannedRequest } from '../../../shared/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { CommonConstants } from '../../../shared/constants/common.constant';
import { UserService } from '../../../shared/services/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BannedService } from '../../../shared/services/banned.service';

@Component({
  selector: 'app-details-banned-user',
  templateUrl: './details-banned-user.component.html',
  styleUrls: ['./details-banned-user.component.scss']
})
export class DetailsBannedUserComponent implements OnInit {

  public id = '';

  public currentUser = new User();
  public bannedUser = new User();

  public bannedAvatar = '';
  public defaultAvatar = '/assets/img/images_default_avatar.png';

  public isLoading = false;
  public isRetry = false;

  public bannedUnlockSubcription: Subscription;
  constructor(private sharedService: SharedService,
  private authService: AuthService,
  private toast: ToastrService,
  private userService: UserService,
  private activatedRoute: ActivatedRoute,
  private bannedService: BannedService) {
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
      this.currentUser = _user;
      this.bannedUnlockSubcription = this.sharedService.bannedUnlockSubcription.subscribe(res => {
        this.toast.success('Tài khoản đã mở khóa');
        this.getBannedUser();
      });
      this.activatedRoute.queryParams.subscribe(param => {
        this.id = param.id;
        this.getBannedUser();
      });
    }
  }

  setAvatarBanned(avatar: string) {
    this.bannedAvatar = avatar ? avatar : this.defaultAvatar;
  }

  ngOnInit() {
  }

  onClickBannedButton() {
    const bannedRole = this.bannedUser.old_auth;
    const request: BannedRequest = {
      id: this.bannedUser.id,
      authorization: bannedRole
    };
    this.userService.updateUserInfo(request).subscribe(res => {
      const response = res.body;
      if (response && response.status === '1') {
        this.bannedService.deleteBanned(this.bannedUser.id).subscribe(resx => {
          if (resx.body && resx.body.status === '1') {
            this.sharedService.bannedUnlockSubcription.next();
            this.sharedService.routingToPage(PageName.LISTING_BANNED_PAGE);
          }
        }, error => {
          this.toast.error('Có lỗi xảy ra. Vui lòng thử lại');
        });
      }
    }, error => {
      this.toast.error('Có lỗi xảy ra. Vui lòng thử lại');
    });
  }

  getBannedUser() {
    this.isLoading = true;
    this.isRetry = false;
    const request: GetBannedUserRequest = {
      user_id: this.id
    };
    this.bannedService.getBannedUser(request).subscribe(res => {
      if (res) {
        this.setAvatarBanned(res.avatar);
        this.bannedUser = res;
        this.isLoading = false;
      } else {
        this.isRetry = true;
      }

    }, error => {
      this.isRetry = true;
    });
  }

  onClickRetry(event: any) {
    // this.getArrayTutor();
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

  onClickListingBannedButton() {
    this.sharedService.routingToPage(PageName.LISTING_BANNED_PAGE);
  }


}
