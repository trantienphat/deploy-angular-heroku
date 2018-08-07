import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  private setDefaultOptions(options?: any) {
    options = options ? options : {};
    if (!options.headers) {
      const headers = new HttpHeaders(
        { 'Content-Type': 'application/form-data' });
      options.headers = headers;
      options.headers = null;
    }
    return options;
  }

  public get(url: string, options: any): Observable<any> {
    options = this.setDefaultOptions(options);
    return this.httpClient.get(url, options);
  }

  public post(url: string, data: any, options?: any): Observable<any> {
    options = this.setDefaultOptions(options);
    const body = JSON.stringify(data);
    return this.httpClient.post(url, body, options);
  }

  public put(url: string, data: any, options?: any): Observable<any> {
    options = this.setDefaultOptions(options);
    const body = JSON.stringify(data);
    return this.httpClient.put(url, body, options);
  }

  public delete(url: string, options?: any): Observable<any> {
    options = this.setDefaultOptions(options);
    return this.httpClient.delete(url, options);
  }

  public postFormData(url: string, formData: FormData, options?: any): Observable<any> {
    options = this.setDefaultOptions(options);
    const uploadReq = new HttpRequest('POST', url, formData, options);
    return this.httpClient.request(uploadReq);
  }
}
