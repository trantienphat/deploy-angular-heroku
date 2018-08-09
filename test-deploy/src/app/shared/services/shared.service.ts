import { Injectable } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class SharedService {

  public bannedSubcription = new Subject<any>();

  constructor(private router: Router) { }

  public routingToPage(page: string) {
    this.router.navigateByUrl('/' + page);
  }

  public routingToPageWithParam(page: string, param: any) {
    this.router.navigate([`/${page}`], { queryParams: param });
  }

  public setLocalStorage(key: string, value: any) {
    const _value = JSON.stringify(value);
    window.localStorage.setItem(key, _value);
  }

  public getLocalStorage(key: string) {
    const value = JSON.parse(window.localStorage.getItem(key));
    return value;
  }

  public removeLocalStorage(key: string) {
    window.localStorage.removeItem(key);
  }

  public clearLocalStorage() {
    window.localStorage.clear();
  }
}
