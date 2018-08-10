import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';
import { User, ChangeVerificationRequest } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VerificationDocumentService } from '../../services/verification-document.service';
import { AuthService } from '../../../auth/auth.service';
import { PageName } from '../../constants/routing.constant';
import { CommonConstants } from '../../constants/common.constant';
import { VerificationDocument,
    GetVerificationDocumentIdRequest,
    UpdateVerificationDocumentRequest } from '../../models/verificationdocument.model';

@Component({
  selector: 'app-card-verification-info',
  templateUrl: './card-verification-info.component.html',
  styleUrls: ['./card-verification-info.component.scss']
})
export class CardVerificationInfoComponent implements OnInit {

  public id = '';
  public currentUser = new User(); // Current Admin login
  public verificationDocument = new VerificationDocument();

  public isLoading = false;
  public isRetry = false;

  public backImg = '';
  public frontImg = '';
  public defaultImg = '/assets/img/images_default_avatar.png';

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
        this.getVerificationDocument();
      });
    }
  }

  setImg() {
    this.backImg = this.verificationDocument.img_back_side ? this.verificationDocument.img_back_side : this.defaultImg;
    this.frontImg = this.verificationDocument.img_front_side ? this.verificationDocument.img_front_side : this.defaultImg;
  }

  getVerificationDocument() {
    this.isLoading = true;
    this.isRetry = false;
    const request: GetVerificationDocumentIdRequest = {
      id: this.id
    };
    this.verificationDocumentService.getVerificationDocumentId(request).subscribe(res => {
      if (!res) {
        this.isRetry = true;
      } else {
        this.isLoading = false;
        this.verificationDocument = res;
        this.setImg();
      }
    }, error => {
      this.isRetry = true;
    });
  }

  ngOnInit() {
  }

  onClickSuccessButton() {
    this.isLoading = true;
    const verifcationVerifi = '1';
    const request: UpdateVerificationDocumentRequest = {
      id: this.id,
      verification: verifcationVerifi
    };
    this.verificationDocumentService.updateVerificationDocument(request).subscribe(res => {
      if (res.body && res.body.status == 1) {
        const requestUpdate: ChangeVerificationRequest = {
          id: this.verificationDocument.user_id,
          verification: '1'
        };
        this.userService.updateUserInfo(requestUpdate).subscribe(resx => {
          if ( resx.body && resx.body.status == 1) {
            this.toast.success('Đã xác minh');
            const routing = {
              id: this.verificationDocument.user_id
            };
            this.isLoading = false;
            this.sharedService.routingToPageWithParam(PageName.DETAILS_TUTOR_INFO_PAGE, routing);
          }
        }, error => {
          this.isLoading = false;
          this.toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
        });
      }
    }, error => {
      this.isLoading = false;
      this.toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
    });
  }

  onClickCancelButton() {
    this.isLoading = true;
    const verifcationCancel = '2';
    const request: UpdateVerificationDocumentRequest = {
      id: this.id,
      verification: verifcationCancel
    };
    this.verificationDocumentService.updateVerificationDocument(request).subscribe(res => {
      if (res.body && res.body.status == 1) {
        this.toast.success('Đã hủy xác minh');
        const routing = {
          id: this.verificationDocument.user_id
        };
        this.isLoading = false;
        this.sharedService.routingToPageWithParam(PageName.DETAILS_TUTOR_INFO_PAGE, routing);
      }
    }, error => {
      this.isLoading = false;
      this.toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
    });
  }

  onClickRetry(event: any) {
    this.activatedRoute.queryParams.subscribe(param => {
      this.id = param.id;
      this.getVerificationDocument();
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

  onClickLogoutButton() {
    // Code here
    this.authService.logout();
  }
}
