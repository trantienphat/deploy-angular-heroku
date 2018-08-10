import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { PageName } from '../../../shared/constants/routing.constant';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../shared/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { CommonConstants } from '../../../shared/constants/common.constant';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-details-banned-user',
  templateUrl: './details-banned-user.component.html',
  styleUrls: ['./details-banned-user.component.scss']
})
export class DetailsBannedUserComponent implements OnInit {

  public currentUser = new User();
  public bannedUser = new User();

  public isLoading = false;
  public isRetry = false;

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
      this.currentUser = _user;
      // this.bannedSubcription = this.sharedService.bannedSubcription.subscribe(res => {
      //   this.toast.success('Tài khoản đã bị khóa');
      //   this.getArrayTutor();
      // });
      // this.getArrayTutor();
    }
  }

  ngOnInit() {
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
