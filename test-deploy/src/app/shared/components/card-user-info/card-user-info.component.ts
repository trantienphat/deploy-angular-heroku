import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { SharedService } from '../../services/shared.service';
import { PageName } from '../../constants/routing.constant';

@Component({
  selector: 'app-card-user-info',
  templateUrl: './card-user-info.component.html',
  styleUrls: ['./card-user-info.component.scss']
})
export class CardUserInfoComponent implements OnInit {

  @Input() isStudent;
  @Input() user: User;
  public userAvatar = '';
  public defaultAvatar = '/assets/img/images_default_avatar.png';

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.setUserAvatar();
  }

  setUserAvatar() {
    this.userAvatar = this.user.avatar ? this.user.avatar : this.defaultAvatar;
  }

  onClickDetailsButton() {
    const paramRouting = {
      id: this.user.id
    };
    if ( this.isStudent) {
      this.sharedService.routingToPageWithParam(PageName.DETAILS_STUDENT_INFO_PAGE, paramRouting);
    } else {
      this.sharedService.routingToPageWithParam(PageName.DETAILS_TUTOR_INFO_PAGE, paramRouting);
    }
  }

}
