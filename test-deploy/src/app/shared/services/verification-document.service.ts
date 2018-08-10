import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { ApiUrl } from '../constants/api-url.constant';
import HttpParamsHelper from '../helper/http-param.helper';
import { Observable } from 'rxjs/Observable';
import { GetVerificationDocumentUserRequest } from '../models/verificationdocument.model';

@Injectable()
export class VerificationDocumentService {

  private base_uri = environment.BASE_URI;

  constructor(private http: HttpService) { }

  getVerificationDocumentUser(request: GetVerificationDocumentUserRequest): Observable<any> {
    const url = `${this.base_uri}${ApiUrl.GET_VERIFICATION_USER}`;
    return this.http.get(url, {params: HttpParamsHelper.parseObjectToHttpParams(request)});
  }
}
