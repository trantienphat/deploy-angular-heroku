import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  @Input() isRetry = false;
  @Output() retry = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  onButtonRetryClick() {
    this.retry.emit(true);
  }
}
