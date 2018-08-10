import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { ApiUrl } from '../constants/api-url.constant';
import HttpParamsHelper from '../helper/http-param.helper';
import { Observable } from 'rxjs/Observable';
import { GetBannedUserRequest, AddBannedRequest } from '../models/user.model';

@Injectable()
export class BannedService {

  private base_uri = environment.BASE_URI;

  constructor(private http: HttpService) { }

  getBanneds(): Observable<any>{
    const url = `${this.base_uri}${ApiUrl.GET_BANNEDS}`;
    return this.http.get(url, {params: HttpParamsHelper.parseObjectToHttpParams()});
  }

  getBannedUser(request: GetBannedUserRequest): Observable<any> {
    const url = `${this.base_uri}${ApiUrl.GET_BANNED_USER}`;
    return this.http.get(url, {params: HttpParamsHelper.parseObjectToHttpParams(request)});
  }

  addBanned(request: AddBannedRequest) {
    const url = `${this.base_uri}${ApiUrl.ADD_BANNED}`;
    const jsonValue = JSON.stringify(request);
    const formData = new FormData();
    formData.append('request', jsonValue);
    return this.http.postFormData(url, formData);
  }

  deleteBanned(request: string) {
    const url = `${this.base_uri}${ApiUrl.DELETE_BANNED}`;
    const formData = new FormData();
    formData.append('user_id', request);
    return this.http.postFormData(url, formData);
  }
}
