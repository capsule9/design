import {Inject, Injectable} from '@angular/core';
import {HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../../auth/src/auth.service';
import {AJAX_LIST_API_URI} from '../tokens';

@Injectable()
export class AjaxListService {
  constructor(
    @Inject(AJAX_LIST_API_URI) private urls: any,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  get(listType: string, params: any): Observable<any> {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    if (this.auth.isAuthenticated()) {
      headers.append('Authorization', 'Bearer ' + this.auth.token);
    }

    if (params && Object.keys(params).length) {
      const reqParams = new HttpParams();
      Object.keys(params).forEach(key => {
        reqParams.append(key, params[key]);
      });

      const options = { params: reqParams, headers: headers };
      return this.http.get(this.urls[listType], options)
        .map(resp => JSON.stringify(resp));

    } else {

      const options = { headers: headers };
      return this.http.get(this.urls[listType], options)
        .map(resp => JSON.stringify(resp));
    }
  }

  post(listType: string, form: Object): Observable<any> {
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json');
    if (this.auth.isAuthenticated()) {
      headers.append('Authorization', 'Bearer ' + this.auth.token);
    }
    const options = { headers: headers };
    return this.http.post(this.urls[listType], form, options)
      .map(resp => JSON.stringify(resp));
  }

}

