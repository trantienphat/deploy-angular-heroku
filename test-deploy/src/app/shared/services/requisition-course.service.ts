import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { ApiUrl } from '../constants/api-url.constant';
import HttpParamsHelper from '../helper/http-param.helper';
import { RequestRequisitionById } from '../models/requisition-course.model';


@Injectable()
export class RequisitionCourseService {

  private base_uri = environment.BASE_URI;

  constructor(private http: HttpService) { }

  getRequistionCourse() {
    const url = this.base_uri + ApiUrl.GET_REQUISITIONS_API;
    return this.http.get(url, {});
  }

  getRequisitionCourseById(request: RequestRequisitionById) {
    const url = this.base_uri + ApiUrl.GET_REQUISITIONS_BY_ID_API;
    return this.http.get(url, { params: HttpParamsHelper.parseObjectToHttpParams(request)});
  }
}
