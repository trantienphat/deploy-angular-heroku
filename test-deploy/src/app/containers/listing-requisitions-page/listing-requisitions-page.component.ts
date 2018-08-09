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


  public currentUser = new User();

  public arrayRequisition: Array<RequisitionCourse> = [];
  public pageSize = 10;
  public page = 1;

  public isLoading = false;
  public isRetry = false;

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
    const userInfo: User = this.sharedService.getLocalStorage(CommonConstants.userInfo);
    if ( !userInfo) {
      this.authService.logout();
    } else {
      this.currentUser = userInfo;
      this.getRequisitionsCourse();
    }
  }

  getRequisitionsCourse() {
    this.isLoading = true;
    this.isRetry = false;
    this.requisitionService.getRequistionCourse().subscribe(res => {
      this.arrayRequisition = res;
      this.isLoading = false;
    }, error => {
      this.isRetry = true;
    });
  }

  ngOnInit() {
  }

  onClickRetry(event: any) {
    this.getRequisitionsCourse();
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
    this.authService.logout();
  }

  onClickDetailsButton(_id: string) {
    const paramRouting = {
      id: _id
    };
    this.sharedService.routingToPageWithParam(PageName.DETAILS_REQUISITION_COURSE_PAGE, paramRouting);
  }

}
