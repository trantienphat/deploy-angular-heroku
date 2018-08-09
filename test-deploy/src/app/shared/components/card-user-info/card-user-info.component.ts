import { Component, OnInit, Input } from '@angular/core';
import { User, BannedRequest } from '../../models/user.model';
import { SharedService } from '../../services/shared.service';
import { PageName } from '../../constants/routing.constant';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private sharedService: SharedService,
     private userService: UserService,
     private toast: ToastrService) { }

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

  onClickBannedButton() {
    const bannedRole = '0';
    const request: BannedRequest = {
      id: this.user.id,
      authorization: bannedRole
    };
    this.userService.updateUserInfo(request).subscribe(res => {
      const response = res.body;
      if (response && response.status === '1') {
        // this.toast.success('Khóa tài khoản thành công');
        this.sharedService.bannedSubcription.next();
      }
    }, error => {
      this.toast.error('Có lỗi xảy ra. Vui lòng thử lại');
    });
  }

}
