import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{

  constructor(
    private router: Router,
    private authenService: AuthenticationService
) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const flag = await this.authenService.checkLogin();
    console.log(flag);
    if( flag){
      // this.router.navigate(['/home']);
      return true;
    }

    location.replace('/login');
    return false;
  }

}
