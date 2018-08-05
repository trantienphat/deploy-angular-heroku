import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { GetUserInfoRequest, GetUserByAuth } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { ApiUrl } from '../constants/api-url.constant';
import HttpParamsHelper from '../helper/http-param.helper';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {

  private base_uri = environment.BASE_URI;
  constructor(private http: HttpService) { }

  public getUserInfo(request: GetUserInfoRequest): Observable<any> {
    const apiUrl = `${this.base_uri}${ApiUrl.GET_USER_INFO_API}`;
    return this.http.get(apiUrl, { params: HttpParamsHelper.parseObjectToHttpParams(request) });
  }

  public getUserByAuth(request: GetUserByAuth): Observable<any> {
    const apiUrl = `${this.base_uri}${ApiUrl.GET_USER_BY_AUTH}`;
    return this.http.get(apiUrl, { params: HttpParamsHelper.parseObjectToHttpParams(request) });
  }
}
