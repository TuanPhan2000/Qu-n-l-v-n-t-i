import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { RequestParam } from '../data/request-param';
import { Route } from '../data/route';
import { ApiUrlUtil } from '../util/api-url.util';
import { ParamUtil } from '../util/param.util';
import {CoachTurn} from "../data/coach-turn";
@Injectable({
  providedIn: 'root'
})
export class CoachTurnService {

  constructor(
    private httpClient : HttpClient,
    private  _cookieService: CookieService
  ) {}

  private baseUrl = `${environment.baseUrl}/coachTurn`;

  // private httpOptions = {
  //   header: new HttpHeaders( {'Content-Type' : 'application/json', 'Authorization':this._cookieService.get('Authorization')})
  // };
  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' ,
        'Authorization': this._cookieService.get('Authorization')
      })
  };

  getAll(){
    const coachTurnUrl = `${this.baseUrl}/findAll`;
    return this.httpClient.get<CoachTurn[]>(coachTurnUrl,this.httpOptions);
  }
  getCoachTurnById(id: number){
    const coachTurnUrl = `${this.baseUrl}/findById/${id}`;
    return this.httpClient.get<CoachTurn>(coachTurnUrl,this.httpOptions);
  }

  createCoachTurn(coachTurn: CoachTurn){
    const coachTurnUrl = `${this.baseUrl}/create`;
    return this.httpClient.post<CoachTurn>(coachTurnUrl,coachTurn,this.httpOptions);
  }

  searchCoachTurn(param: any){
    const params: RequestParam[] = ParamUtil.toRequestParams(param);
    const coachTurnUrl = ApiUrlUtil.buildQueryString(this.baseUrl+ '/search', params);
    console.log(coachTurnUrl);
    return this.httpClient.get<CoachTurn[]>(coachTurnUrl,this.httpOptions);
  }

  deleteCoachTurn(id:number){
    const coachTurnUrl = `${this.baseUrl}/deleteById/${id}`;
    return this.httpClient.delete<any>(coachTurnUrl,this.httpOptions);
  }

  update(coachTurn: CoachTurn){
    const coachTurnUrl = `${this.baseUrl}/update`;
    return this.httpClient.put<CoachTurn>(coachTurnUrl,coachTurn,this.httpOptions);
  }

  getRevenueCoachByTime(param: any){
    const params: RequestParam[] = ParamUtil.toRequestParams(param);
    const coachTurnUrl = ApiUrlUtil.buildQueryString(this.baseUrl+ '/getRevenueCoachByTime', params);
    return this.httpClient.get<any[]>(coachTurnUrl,this.httpOptions);
  }

  getListCoachTurnByIdCoachAndTime(param: any){
    const params: RequestParam[] = ParamUtil.toRequestParams(param);
    const coachTurnUrl = ApiUrlUtil.buildQueryString(this.baseUrl+ '/getListCoachTurnByIdCoachAndTime', params);
    return this.httpClient.get<CoachTurn[]>(coachTurnUrl,this.httpOptions);
  }

}
