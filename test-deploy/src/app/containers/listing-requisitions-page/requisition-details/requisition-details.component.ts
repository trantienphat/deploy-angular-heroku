import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { AuthService } from '../../../auth/auth.service';
import { RequisitionCourseService } from '../../../shared/services/requisition-course.service';
import { User } from '../../../shared/models/user.model';
import { CommonConstants } from '../../../shared/constants/common.constant';

@Component({
  selector: 'app-requisition-details',
  templateUrl: './requisition-details.component.html',
  styleUrls: ['./requisition-details.component.scss']
})
export class RequisitionDetailsComponent implements OnInit {

  public id = '';
  public user = new User();

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
    const _user = JSON.parse(window.localStorage.getItem(CommonConstants.userInfo));
    if ( !_user) {
      this.authService.logout();
    } else {
      this.user = _user;
      this.activatedRoute.queryParams.subscribe(param => {
        this.id = param.id;
      });
      this.getRequisitionsCourseById();
    }
  }

  getRequisitionsCourseById() {

  }

  ngOnInit() {
  }

}
