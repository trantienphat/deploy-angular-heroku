import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { PageName } from '../../shared/constants/routing.constant';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user.model';
import { CommonConstants } from '../../shared/constants/common.constant';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';
import { BannedService } from '../../shared/services/banned.service';

@Component({
  selector: 'app-listing-banned-user',
  templateUrl: './listing-banned-user.component.html',
  styleUrls: ['./listing-banned-user.component.scss']
})
export class ListingBannedUserComponent implements OnInit {

  public currentUser = new User();
  public bannedArray: Array<User> = [];

  public isLoading = false;
  public isRetry = false;

  public pageSize = 10;
  public page = 1;

  public bannedUnlockSubcription: Subscription;

  constructor(private sharedService: SharedService,
  private authService: AuthService,
  private toast: ToastrService,
  private userService: UserService,
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
        this.getBanneds();
      });
      this.getBanneds();
    }
  }

  getBanneds() {
    this.isLoading = true;
    this.isRetry = false;
    this.bannedService.getBanneds().subscribe(res => {
      console.log(res);
      this.isLoading = false;
      this.bannedArray = res;
    }, error => {
      this.isLoading = false;
      this.isRetry = true;
    });
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
