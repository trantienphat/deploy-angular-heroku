import { Component, OnInit } from '@angular/core';
import { PageName } from '../../shared/constants/routing.constant';
import { SharedService } from '../../shared/services/shared.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-listing-students-page',
  templateUrl: './listing-students-page.component.html',
  styleUrls: ['./listing-students-page.component.scss']
})
export class ListingStudentsPageComponent implements OnInit {

  public isStudent = true;

  public userName = 'trantienphat1110@gmail.com';

  constructor(private sharedService: SharedService, private authService: AuthService) {
    this.checkAccessPage();
   }

  checkAccessPage() {
    if ( !this.authService.checkAuthentication()) {
      this.authService.logout();
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

}
