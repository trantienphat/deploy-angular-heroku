import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { PageName } from '../../shared/constants/routing.constant';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {


  public user: any = '';

  public userName = 'trantienphat1110@gmail.com';

  public userAvatar = '';
  public defaultAvatar = 'https://i.imgur.com/21O21RJ.jpg';

  constructor(private sharedService: SharedService, private authService: AuthService) { 
    this.checkAccessPage();
  }

  checkAccessPage() {
    if ( !this.authService.checkAuthentication()) {
      this.authService.logout();
    }
  }

  ngOnInit() {
    this.setAvatarUser();
  }

  setAvatarUser() {
    this.userAvatar = this.user ? this.user : this.defaultAvatar;
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
