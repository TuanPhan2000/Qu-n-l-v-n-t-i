import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { RequestParam } from '../data/request-param';
import { Route } from '../data/route';
import { ApiUrlUtil } from '../util/api-url.util';
import { ParamUtil } from '../util/param.util';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private baseUrl = `${environment.baseUrl}/route`;

  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' ,
        'Authorization': this._cookieService.get('Authorization')
      })
  };

  constructor(private httpClient: HttpClient,
    private _cookieService: CookieService) { }

  getAll(){
    const routeUrl = `${this.baseUrl}/findAll`;
    return this.httpClient.get<Route[]>(routeUrl,this.httpOptions);
  }

  getRouteById(id: number){
    const routeUrl = `${this.baseUrl}/findById/${id}`;
    return this.httpClient.get<Route>(routeUrl,this.httpOptions);
  }

  createRoute(route: Route){
    const routeUrl = `${this.baseUrl}/create`;
    return this.httpClient.post<Route>(routeUrl,route,this.httpOptions);
  }

  searchRoute(param: any){
    const params: RequestParam[] = ParamUtil.toRequestParams(param);
    const routeUrl = ApiUrlUtil.buildQueryString(this.baseUrl+ '/searchRoute', params);
    console.log(routeUrl);
    // const routeUrl = `${this.baseUrl}/searchRoute?${param}`;
    return this.httpClient.get<Route[]>(routeUrl,this.httpOptions);
  }

  deleteRoute(id: number){
    const routeUrl = `${this.baseUrl}/deleteById/${id}`;
    return this.httpClient.delete<any>(routeUrl,this.httpOptions);
  }

  update(route: Route){
    const routeUrl = `${this.baseUrl}/update`;
    return this.httpClient.put<any>(routeUrl,route,this.httpOptions);
  }

  findAllComplexity(){
    const complexityUrl = `${environment.baseUrl}/complexity/findAll`;
    return this.httpClient.get<any>(complexityUrl,this.httpOptions);
  }

}
