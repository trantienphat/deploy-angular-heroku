import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { PageName } from '../../../shared/constants/routing.constant';

@Component({
  selector: 'app-details-banned-user',
  templateUrl: './details-banned-user.component.html',
  styleUrls: ['./details-banned-user.component.scss']
})
export class DetailsBannedUserComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  onClickListingBannedButton() {
    this.sharedService.routingToPage(PageName.LISTING_BANNED_PAGE);
  }


}
