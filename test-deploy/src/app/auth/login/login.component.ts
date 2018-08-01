import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { PageName } from '../../shared/constants/routing.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  onClickSignInButton() {
    this.sharedService.routingToPage(PageName.DASHBOARD_PAGE);
  }

}
