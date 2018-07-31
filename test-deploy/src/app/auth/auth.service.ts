import { Injectable } from '@angular/core';
import { LoginRequestModel } from '../shared/models/user.model';

@Injectable()
export class AuthService {

  constructor() { }

  login(request: LoginRequestModel): boolean {
    // Code here
    return true;
  }

  logout() {
    // Code here
  }

  checkAuthentication(): boolean {
    // Code check is login
    return true;
  }
}
