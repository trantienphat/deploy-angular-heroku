import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { PageName } from '../../shared/constants/routing.constant';

@Component({
  selector: 'app-listing-banned-user',
  templateUrl: './listing-banned-user.component.html',
  styleUrls: ['./listing-banned-user.component.scss']
})
export class ListingBannedUserComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  onClickListingBannedButton() {
    this.sharedService.routingToPage(PageName.LISTING_BANNED_PAGE);
  }

}
