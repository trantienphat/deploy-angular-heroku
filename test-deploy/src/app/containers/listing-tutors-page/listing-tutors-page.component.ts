import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { PageName } from '../../shared/constants/routing.constant';
import { AuthService } from '../../auth/auth.service';
import { User, GetUserByAuth } from '../../shared/models/user.model';
import { CommonConstants } from '../../shared/constants/common.constant';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listing-tutors-page',
  templateUrl: './listing-tutors-page.component.html',
  styleUrls: ['./listing-tutors-page.component.scss']
})
export class ListingTutorsPageComponent implements OnInit {

  public user = new User();
  public arrayTutor: Array<User> = [];

  public isStudent = false;

  public pageSize = 10;
  public page = 1;

  public isLoading = false;
  public isRetry = false;

  public bannedSubcription: Subscription;

  constructor(private sharedService: SharedService,
     private authService: AuthService,
    private userService: UserService,
    private toast: ToastrService) {
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
      this.bannedSubcription = this.sharedService.bannedSubcription.subscribe(res => {
        this.toast.success('Tài khoản đã bị khóa');
        this.getArrayTutor();
      });
      this.getArrayTutor();
    }
  }

  getArrayTutor() {
    this.isLoading = true;
    this.isRetry = false;
    const typeAuthTutor = '2';
    const request: GetUserByAuth = {
      authorization: typeAuthTutor
    };
    this.userService.getUserByAuth(request).subscribe(res => {
      this.arrayTutor = res;
      this.isLoading = false;
    }, error => {
      this.isRetry = true;
    });
  }

  ngOnInit() {
  }

  onClickRetry(event: any) {
    this.getArrayTutor();
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
    // Code here
    this.authService.logout();
  }

}
