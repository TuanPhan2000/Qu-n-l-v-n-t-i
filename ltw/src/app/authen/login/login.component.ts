import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../service/authentication.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
// import { get } from 'http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logIn!: FormGroup;


  constructor(private authService: AuthenticationService,
    private router : Router,
    public dialog: MatDialog,
    private _cookieService: CookieService) {}

  ngOnInit(): void {
    this.logIn = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        // Validators.maxLength(50)
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.minLength(8),
        // Validators.maxLength(50),
        // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]),
    });
  }

  // async checkLogin(){
  //   await this.authService.checkLogin();
  // }

  login() {
    const u = this.logIn.controls['username'].value;
    const p = this.logIn.controls['password'].value;

    const account ={
      username: u,
      password: p
    }

    console.log(account)

    this.authService.getJwtToken(account).subscribe(
      data =>{
      console.log(data);
      this._cookieService.set("Authorization",data.token,1);
      // this.router.navigate(["/route"]);
      location.replace("/home");
    }, error =>{
      alert("Login fail: check username and password");
      console.log(error);
  })
  }

  check(){
    const dialogRef = this.dialog.open(ResetPasswordComponent, { });

  }

  get username() {
    return this.logIn.get('username');
  }
  get password() {
    return this.logIn.get('password');
  }
}
