import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { RequestParam } from '../data/request-param';
import { Driver } from '../data/driver';
import { ApiUrlUtil } from '../util/api-url.util';
import { ParamUtil } from '../util/param.util';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private baseUrl = `${environment.baseUrl}/driver`;

  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' ,
        'Authorization': this._cookieService.get('Authorization')
      })
  };

  constructor(private httpClient: HttpClient,
    private _cookieService: CookieService) { }

  getAll(){
    const driverUrl = `${this.baseUrl}/findAll`;
    return this.httpClient.get<Driver[]>(driverUrl,this.httpOptions);
  }

  getDriverById(id: number){
    const driverUrl = `${this.baseUrl}/findById/${id}`;
    return this.httpClient.get<Driver>(driverUrl,this.httpOptions);
  }

  createDriver(driver: Driver){
    const driverUrl = `${this.baseUrl}/create`;
    return this.httpClient.post<Driver>(driverUrl,driver,this.httpOptions);
  }

  searchDriver(param: any){
    const params: RequestParam[] = ParamUtil.toRequestParams(param);
    const driverUrl = ApiUrlUtil.buildQueryString(this.baseUrl+ '/searchDriver', params);
    console.log(driverUrl);
    // const driverUrl = `${this.baseUrl}/searchRoute?${param}`;
    return this.httpClient.get<Driver[]>(driverUrl,this.httpOptions);
  }

  deleteDriver(id: number){
    const driverUrl = `${this.baseUrl}/deleteById/${id}`;
    return this.httpClient.delete<any>(driverUrl,this.httpOptions);
  }

  update(driver: Driver){
    const driverUrl = `${this.baseUrl}/update`;
    return this.httpClient.put<any>(driverUrl,driver,this.httpOptions);
  }


}
