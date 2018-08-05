import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { environment } from '../../../environments/environment';
import { ApiUrl } from '../../shared/constants/api-url.constant';
import HttpParamsHelper from '../../shared/helper/http-param.helper';
import { DashboardModel } from './dashboard.model';
import { Observable } from 'rxjs/Observable';

const base_uri = environment.BASE_URI;
@Injectable()
export class DashboardService {

  constructor(private http: HttpService) { }

  getDashboardInfo(): Observable<DashboardModel> {
    const url = base_uri + ApiUrl.DASHBOARD_API;
    return this.http.get(url, { params: HttpParamsHelper.parseObjectToHttpParams()});
  }
}
