import { Component, OnInit } from '@angular/core';
import { PageName } from '../../shared/constants/routing.constant';
import { SharedService } from '../../shared/services/shared.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user.model';
import { CommonConstants } from '../../shared/constants/common.constant';
import { RequisitionCourse } from '../../shared/models/requisition-course.model';
import { RequisitionCourseService } from '../../shared/services/requisition-course.service';
import { collectExternalReferences } from '@angular/compiler';

@Component({
  selector: 'app-listing-requisitions-page',
  templateUrl: './listing-requisitions-page.component.html',
  styleUrls: ['./listing-requisitions-page.component.scss']
})
export class ListingRequisitionsPageComponent implements OnInit {


  public user = new User();

  public arrayRequisition: Array<RequisitionCourse> = [];
  public pageSize = 10;
  public page = 1;

  constructor(private sharedService: SharedService,
     private authService: AuthService,
    private requisitionService: RequisitionCourseService) {
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
      this.getRequisitionsCourse();
    }
  }

  getRequisitionsCourse() {
    this.requisitionService.getRequistionCourse().subscribe(res => {
      this.arrayRequisition = res;
      console.log(this.arrayRequisition);
    });
  }
  ngOnInit() {
    // const x = JSON.parse(this.string);
    // this.array = x.response;
    // this.count = this.array.length;
    // console.log(this.count);
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

  onClickDetailsButton(_id: string) {
    const paramRouting = {
      id: _id
    };
    this.sharedService.routingToPageWithParam(PageName.DETAILS_REQUISITION_COURSE_PAGE, paramRouting);
  }

}
