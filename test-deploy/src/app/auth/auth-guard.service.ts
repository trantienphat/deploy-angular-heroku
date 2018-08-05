import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonConstants } from '../shared/constants/common.constant';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string) {
    this.authService.setPreviousUrlBeforeLogging(url);
    if ( this.authService.checkAuthentication()) {
      return true;
    } else {
      return false;
    }
  }
}
