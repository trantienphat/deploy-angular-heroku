import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { PageName } from '../../shared/constants/routing.constant';
import { CommonConstants } from '../../shared/constants/common.constant';
import { AuthService } from '../../auth/auth.service';
import { AuthGuardService } from '../../auth/auth-guard.service';
import { DashboardService } from './dashboard.service';
import { DashboardModel } from './dashboard.model';
import { User } from '../../shared/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  public currentUser = new User();

  public dashboardInfo = new DashboardModel();

  public isLoading = false;
  public isRetry = false;

  constructor(private sharedService: SharedService,
    private authService: AuthService,
    private dashboardService: DashboardService,
    private toast: ToastrService) {
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
    this.isLoading = true;
    this.isRetry = false;
    this.dashboardService.getDashboardInfo().subscribe(res => {
      if (res) {
        this.dashboardInfo = res;
        const userInfo: User = this.sharedService.getLocalStorage(CommonConstants.userInfo);
        this.currentUser = userInfo;
        this.isLoading = false;
      } else {
        this.isRetry = true;
      }
    }, error => {
      // this.isLoading = false;
      this.isRetry = true;
    });
  }

  ngOnInit() {
  }

  onClickRetry(event: any) {
    this.initPage();
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
}
