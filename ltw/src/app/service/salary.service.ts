import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../environments/environment";
import {TotalSalary} from "../data/total-salary";

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(
    private httpClient : HttpClient,
    private _cookieService: CookieService
  ) { }

  private baseUrl = `${environment.baseUrl}/totalSalary`;

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': this._cookieService.get('Authorization')
      }
    )
  };

  findTotalSalaryByMonthAndYear(month:number, year:number){
    const totalSalaryUrl = `${this.baseUrl}/search/${month}/${year}`;
    return this.httpClient.get<TotalSalary[]>(totalSalaryUrl,this.httpOptions);
  }

  getCurrentMonthSalary(){
    const totalSalaryUrl = `${this.baseUrl}/currentMonthSalary`;
    return this.httpClient.get<any[]>(totalSalaryUrl,this.httpOptions);
  }
  saveToDB(data: any){
    const totalSalaryUrl= `${this.baseUrl}/saveToDB`;
    return this.httpClient.post<TotalSalary[]>(totalSalaryUrl,data,this.httpOptions);
  }

}
