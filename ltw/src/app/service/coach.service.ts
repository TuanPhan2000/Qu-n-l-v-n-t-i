import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { RequestParam } from '../data/request-param';
import { Coach } from '../data/coach';
import { ApiUrlUtil } from '../util/api-url.util';
import { ParamUtil } from '../util/param.util';


@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private baseUrl = `${environment.baseUrl}/coach`;
  private httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' ,
        'Authorization': this._cookieService.get('Authorization')
      })
  };
  constructor(private httpClient: HttpClient,
              private _cookieService: CookieService) { }

  getAll(){
    const coachUrl = `${this.baseUrl}/findAll`;
    return this.httpClient.get<Coach[]>(coachUrl,this.httpOptions);
  }
  getCoachById(id: number){
    const coachUrl = `${this.baseUrl}/findById/${id}`;
    return this.httpClient.get<Coach>(coachUrl,this.httpOptions);
  }
  createCoach(coach: Coach){
    const coachUrl = `${this.baseUrl}/create`;
    return this.httpClient.post<Coach>(coachUrl,coach,this.httpOptions);
  }
  searchCoach(param: any){
    const params: RequestParam[] = ParamUtil.toRequestParams(param);
    const coachUrl = ApiUrlUtil.buildQueryString(this.baseUrl+ '/searchCoach', params);
    console.log(coachUrl);

    return this.httpClient.get<Coach[]>(coachUrl,this.httpOptions);
  }
  deleteCoach(id: number){
    const coachUrl = `${this.baseUrl}/deleteById/${id}`;
    return this.httpClient.delete<any>(coachUrl,this.httpOptions);
  }

  update(coach: Coach){
    const coachUrl = `${this.baseUrl}/update`;
    return this.httpClient.put<any>(coachUrl,coach,this.httpOptions);
  }
}
