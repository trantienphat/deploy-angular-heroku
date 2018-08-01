import { Injectable } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Injectable()
export class SharedService {

  constructor(private router: Router) { }

  public routingToPage(page: string) {
    this.router.navigateByUrl('/' + page);
  }

  public routingToPageWithParam(page: string, param: any) {
    this.router.navigate([`/${page}`], { queryParams: param });
  }
}
