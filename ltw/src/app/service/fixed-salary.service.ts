import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { RequestParam } from '../data/request-param';
import { FixedSalary } from '../data/fixed-salary';
import { ApiUrlUtil } from '../util/api-url.util';
import { ParamUtil } from '../util/param.util';

@Injectable({
  providedIn: 'root'
})
export class FixedSalaryService {

  private baseUrl = `${environment.baseUrl}/fixedSalary`;

  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' ,
        'Authorization': this._cookieService.get('Authorization')
      })
  };

  constructor(private httpClient: HttpClient,
    private _cookieService: CookieService) { }

  getAll(){
    const fixedSalaryrUrl = `${this.baseUrl}/findAll`;
    return this.httpClient.get<FixedSalary[]>(fixedSalaryrUrl,this.httpOptions);
  }
}
