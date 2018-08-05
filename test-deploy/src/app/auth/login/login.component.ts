import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { PageName } from '../../shared/constants/routing.constant';
import { LoginRequestModel } from '../../shared/models/user.model';
import { AuthService } from '../auth.service';
import { CommonConstants } from '../../shared/constants/common.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginRequest = new LoginRequestModel();

  public redirectUrl = '';

  constructor(private sharedService: SharedService, private authService: AuthService) {
    this.checkAccessPage();
  }

  checkAccessPage() {
    if (!this.authService.checkAuthentication()) {
      this.authService.logout();
    } else {
      this.redirectUrl = window.localStorage.getItem(CommonConstants.redirectUrl);
      if (this.redirectUrl) {
        this.sharedService.routingToPage(this.redirectUrl);
      } else {
        this.sharedService.routingToPage(PageName.DASHBOARD_PAGE);
      }

    }
  }

  ngOnInit() {
  }

  onClickSignInButton() {
    this.authService.login(this.loginRequest);
    // this.sharedService.routingToPage(PageName.DASHBOARD_PAGE);
  }

}
