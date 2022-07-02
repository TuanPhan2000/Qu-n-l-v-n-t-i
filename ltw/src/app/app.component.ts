import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ltw';
  check: boolean | undefined ;
  constructor(private authService: AuthenticationService,
    private location: Location,
    private router: Router){
      this.check = this.authService.flag;
      this.checkLogin();
      // console.log("check " + this.check);
      this.getPath();
  }
  ngOnInit(): void {
  }

  async getPath(){
    this.authService.path = await this.location.path();
  }

  async checkLogin(){
    await this.authService.checkLogin();
    this.check = this.authService.flag;
    console.log("check " + this.check);
    // location.reload();
    if(this.check===true) {
    this.router.navigate([this.authService.path==="/login"? "":this.authService.path]);
    }
  }

  async logOut(){
    await this.authService.logout();
    this.check = this.authService.flag;
    // this.check = false;
  }
}
