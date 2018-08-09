import { Component, OnInit } from '@angular/core';
import { User, GetUserInfoRequest } from '../../../shared/models/user.model';
import { SharedService } from '../../../shared/services/shared.service';
import { UserService } from '../../../shared/services/user.service';
import { PageName } from '../../../shared/constants/routing.constant';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { CommonConstants } from '../../../shared/constants/common.constant';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  public id = '';
  public user = new User(); // Current Admin login
  public student = new User();

  public studentAvatar = '';
  public defaultAvatar = '/assets/img/images_default_avatar.png';

  public isLoading = false;
  public isRetry = false;

  public bannedSubcription: Subscription;

  constructor(private sharedService: SharedService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
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
    const _user = JSON.parse(window.localStorage.getItem(CommonConstants.userInfo));
    if (!_user) {
      this.authService.logout();
    } else {
      this.user = _user;
      this.bannedSubcription = this.sharedService.bannedSubcription.subscribe(res => {
        this.toast.success('Tài khoản đã bị khóa');
        this.sharedService.routingToPage(PageName.LISTING_STUDENT_PAGE);
      });
      this.activatedRoute.queryParams.subscribe(param => {
        this.id = param.id;
        this.getStudentById(this.id);
      });
    }
  }

  getStudentById(_id: string) {
    this.isLoading = true;
    this.isRetry = false;
    const request: GetUserInfoRequest = {
      id: _id
    };
    this.userService.getUserInfo(request).subscribe(res => {
      const array: Array<any> = res;
      if (array.length >= 1) {
        this.student = res[0];
        this.setAvatarStudent();
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
      this.getStudentById(this.id);
    });
  }

  setAvatarStudent() {
    this.studentAvatar = this.student.avatar ? this.student.avatar : this.defaultAvatar;
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
