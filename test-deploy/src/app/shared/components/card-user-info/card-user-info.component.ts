import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';

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

  constructor() { }

  ngOnInit() {
    this.setUserAvatar();
  }

  setUserAvatar() {
    this.userAvatar = this.user.avatar ? this.user.avatar : this.defaultAvatar;
  }

}
