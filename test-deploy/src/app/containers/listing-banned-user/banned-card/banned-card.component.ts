import { Component, OnInit, Input } from '@angular/core';
import { User, BannedRequest } from '../../../shared/models/user.model';
import { SharedService } from '../../../shared/services/shared.service';
import { UserService } from '../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { PageName } from '../../../shared/constants/routing.constant';
import { BannedService } from '../../../shared/services/banned.service';

@Component({
  selector: 'app-banned-card',
  templateUrl: './banned-card.component.html',
  styleUrls: ['./banned-card.component.scss']
})
export class BannedCardComponent implements OnInit {

  @Input() user: User;
  public userAvatar = '';
  public defaultAvatar = '/assets/img/images_default_avatar.png';

  constructor(private sharedService: SharedService,
    private userService: UserService,
    private toast: ToastrService,
    private bannedService: BannedService) { }

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
      this.sharedService.routingToPageWithParam(PageName.DETAILS_BANNED, paramRouting);
  }

  onClickBannedButton() {
    const bannedRole = this.user.old_auth;
    const request: BannedRequest = {
      id: this.user.id,
      authorization: bannedRole
    };
    this.userService.updateUserInfo(request).subscribe(res => {
      const response = res.body;
      if (response && response.status === '1') {
        this.bannedService.deleteBanned(this.user.id).subscribe(resx => {
          if (resx.body && resx.body.status === '1') {
            this.sharedService.bannedUnlockSubcription.next();
          }
        }, error => {
          this.toast.error('Có lỗi xảy ra. Vui lòng thử lại');
        });
      }
    }, error => {
      this.toast.error('Có lỗi xảy ra. Vui lòng thử lại');
    });
  }
}
