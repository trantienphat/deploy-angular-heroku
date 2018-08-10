import { Component, OnInit } from '@angular/core';
import { User, GetUserInfoRequest, BannedRequest } from '../../../shared/models/user.model';
import { SharedService } from '../../../shared/services/shared.service';
import { UserService } from '../../../shared/services/user.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { PageName } from '../../../shared/constants/routing.constant';
import { CommonConstants } from '../../../shared/constants/common.constant';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { VerificationDocument, GetVerificationDocumentUserRequest } from '../../../shared/models/verificationdocument.model';
import { VerificationDocumentService } from '../../../shared/services/verification-document.service';

@Component({
  selector: 'app-tutor-details',
  templateUrl: './tutor-details.component.html',
  styleUrls: ['./tutor-details.component.scss']
})
export class TutorDetailsComponent implements OnInit {

  public id = '';
  public currentUser = new User(); // Current Admin login
  public tutor = new User();
  public arrayVerificationDocument: Array<VerificationDocument> = [];

  public tutorAvatar = '';
  public defaultAvatar = '/assets/img/images_default_avatar.png';

  public isLoading = false;
  public isRetry = false;
  public isShowData = false;

  public pageSize = 3;
  public page = 1;
  constructor(private sharedService: SharedService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toast: ToastrService,
    private verificationDocumentService: VerificationDocumentService) {
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
      this.currentUser = _user;
      this.activatedRoute.queryParams.subscribe(param => {
        this.id = param.id;
        this.getTutorById(this.id);
      });
    }
  }

  getTutorById(_id: string) {
    this.isLoading = true;
    this.isRetry = false;
    const request: GetUserInfoRequest = {
      id: _id
    };
    this.userService.getUserInfo(request).subscribe(res => {
      const array: Array<any> = res;
      if (array.length !== 0) {
        this.tutor = res[0];
        this.setAvatarTutor();
        this.getVerificationDocumentUser();
      } else {
        this.isRetry = true;
      }
    }, error => {
      this.isRetry = true;
    });
  }

  getVerificationDocumentUser() {
    const request: GetVerificationDocumentUserRequest = {
      user_id: this.id
    };
    this.verificationDocumentService.getVerificationDocumentUser(request).subscribe(res => {
        if (res.response.length > 0) {
          this.isShowData = true;
          this.arrayVerificationDocument = res.response;
        } else {
          this.isShowData = false;
        }
        this.isLoading = false;
    }, error => {
      this.isRetry = true;
    });
  }

  ngOnInit() {
  }

  onClickDetailsButton(idVerification: string) {
    const paramRouting = {
      id: idVerification
    };
    this.sharedService.routingToPageWithParam(PageName.DATAILS_VERIFICATION_DOCUMENT, paramRouting);
  }

  onClickBannedButton() {
    this.isLoading = true;
    const bannedRole = '0';
    const request: BannedRequest = {
      id: this.tutor.id,
      authorization: bannedRole
    };
    this.userService.updateUserInfo(request).subscribe(res => {
      const response = res.body;
      if (response && response.status === '1') {
        this.toast.success('Khóa tài khoản thành công');
        this.sharedService.routingToPage(PageName.LISTING_TUTOR_PAGE);
        this.isLoading = false;
      }
    }, error => {
      this.isLoading = false;
      this.toast.error('Có lỗi xảy ra. Vui lòng thử lại');
    });
  }

  onClickRetry(event: any) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.id = param.id;
      this.getTutorById(this.id);
    });
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

  onClickListingBannedButton() {
    this.sharedService.routingToPage(PageName.LISTING_BANNED_PAGE);
  }

  onClickLogoutButton() {
    // Code here
    this.authService.logout();
  }

}
