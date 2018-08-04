import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-user-info',
  templateUrl: './card-user-info.component.html',
  styleUrls: ['./card-user-info.component.scss']
})
export class CardUserInfoComponent implements OnInit {

  @Input() isStudent;
  public userAvatar = '';
  public defaultAvatar = 'http://www.xaluan.com/images/news/Image/2015/10/25/thon-nu-xinh-nhu-bup-be-hinh-anh_5_ftmr.jpg';

  constructor() { }

  ngOnInit() {
    this.setUserAvatar();
  }

  setUserAvatar() {
    this.userAvatar = this.userAvatar ? this.userAvatar : this.defaultAvatar;
  }

}
