import { HttpParams } from '@angular/common/http';

export default class HttpParamsHelper {
    public static parseObjectToHttpParams(data?: any) {
        let httpParams = new HttpParams();
        if (data) {
            const request = new Request(data);
            Object.keys(request).forEach(function (key) {
                request[key].forEach(item => {
                    httpParams = httpParams.append(key, item);
                });
            });
        }

    }
}
