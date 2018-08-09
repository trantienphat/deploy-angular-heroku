import { Component, OnInit } from '@angular/core';
import { User, GetUserInfoRequest } from '../../../shared/models/user.model';
import { SharedService } from '../../../shared/services/shared.service';
import { UserService } from '../../../shared/services/user.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { PageName } from '../../../shared/constants/routing.constant';
import { CommonConstants } from '../../../shared/constants/common.constant';

@Component({
  selector: 'app-tutor-details',
  templateUrl: './tutor-details.component.html',
  styleUrls: ['./tutor-details.component.scss']
})
export class TutorDetailsComponent implements OnInit {

  public id = '';
  public user = new User(); // Current Admin login
  public tutor = new User();

  public tutorAvatar = '';
  public defaultAvatar = '/assets/img/images_default_avatar.png';

  public isLoading = false;
  constructor(private sharedService: SharedService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
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
      this.activatedRoute.queryParams.subscribe(param => {
        this.id = param.id;
        this.getTutorById(this.id);
      });
    }
  }

  getTutorById(_id: string) {
    this.isLoading = true;
    const request: GetUserInfoRequest = {
      id: _id
    };
    this.userService.getUserInfo(request).subscribe(res => {
      this.tutor = res[0];
      this.setAvatarTutor();
      this.isLoading = false;
    });
  }

  ngOnInit() {
  }

  setAvatarTutor() {
    this.tutorAvatar = this.tutor.avatar ? this.tutor.avatar : this.defaultAvatar;
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
