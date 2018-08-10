import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { AuthService } from '../../../auth/auth.service';
import { RequisitionCourseService } from '../../../shared/services/requisition-course.service';
import { User } from '../../../shared/models/user.model';
import { CommonConstants } from '../../../shared/constants/common.constant';
import { PageName } from '../../../shared/constants/routing.constant';
import { RequestRequisitionById, RequisitionCourse, ResponseRequisitionById } from '../../../shared/models/requisition-course.model';

@Component({
  selector: 'app-requisition-details',
  templateUrl: './requisition-details.component.html',
  styleUrls: ['./requisition-details.component.scss']
})
export class RequisitionDetailsComponent implements OnInit {

  public id = '';
  public currentUser = new User();
  public requisitionCourse = new ResponseRequisitionById();

  public isLoading = false;
  public isRetry = false;

  constructor(private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
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
      this.activatedRoute.queryParams.subscribe(param => {
        this.id = param.id;
        this.getRequisitionsCourseById(this.id);
      });
    }
  }

  getRequisitionsCourseById(_id: string) {
    this.isLoading = true;
    this.isRetry = false;
    const request: RequestRequisitionById = {
      id: _id
    };
    this.requisitionService.getRequisitionCourseById(request).subscribe(res => {
      const array: Array<any> = res;
      if (array.length >= 1) {
        this.requisitionCourse = res[0];
        this.isLoading = false;
      } else {
        this.isRetry = true;
      }
    }, error => {
      this.isRetry = true;
    });
  }

  ngOnInit() {
  }

  onClickRetry(event: any) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.id = param.id;
      this.getRequisitionsCourseById(this.id);
    });
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

  onClickTutorName() {
    const paramRouting = {
      id: this.requisitionCourse.tutor_id
    };
    this.sharedService.routingToPageWithParam(PageName.DETAILS_TUTOR_INFO_PAGE, paramRouting);
  }

  onClickStudentName() {
    const paramRouting = {
      id: this.requisitionCourse.student_id
    };
    this.sharedService.routingToPageWithParam(PageName.DETAILS_STUDENT_INFO_PAGE, paramRouting);
  }

}
