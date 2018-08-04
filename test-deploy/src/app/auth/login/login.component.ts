import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { PageName } from '../../shared/constants/routing.constant';
import { LoginRequestModel } from '../../shared/models/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginRequest = new LoginRequestModel();

  constructor(private sharedService: SharedService, private authService: AuthService) { }

  ngOnInit() {
  }

  onClickSignInButton() {
    this.authService.login(this.loginRequest);
    // this.sharedService.routingToPage(PageName.DASHBOARD_PAGE);
  }

}
