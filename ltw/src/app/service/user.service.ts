import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient : HttpClient,
    private _cookieService: CookieService
  ) { }

  private baseUrl = `${environment.baseUrl}/user`;

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': this._cookieService.get('Authorization')
      }
    )
  };

  getUsername(): any{
    const jwtHelper = new JwtHelperService();
    const token = this._cookieService.get('Authorization');
    return jwtHelper.decodeToken(token).sub;
  }

  getUser(username: any){
    const userUrl = `${this.baseUrl}/findByUserName?username=${username}`;
    return this.httpClient.get<any>(userUrl,this.httpOptions);
  }

  updateUser(data: any){
    const userUrl = `${this.baseUrl}/updateUser`;
    return this.httpClient.put<any>(userUrl,data,this.httpOptions);
  }

  resetPassword(username: any){
    const userUrl = `${this.baseUrl}/resetPassword?username=${username}`;
    return this.httpClient.get<any>(userUrl);
  }
}
