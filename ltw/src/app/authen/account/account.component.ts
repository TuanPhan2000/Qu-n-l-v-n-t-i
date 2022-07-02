import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user: any;

  userId: number = 1;

  check: boolean = false; // check change pass

  checkEditInfor: boolean = false; // check change Infor

  acountForm!: FormGroup;

  editOldPassword: String = '';
  editNewPassword: String = '';
  editConfirmPassword: String = '';

  checkPass: boolean = true;

  constructor(
    private authen: AuthenticationService,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.handleGetUser();
  }

  ngOnInit(): void {
    this.acountForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      currentPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  handleGetUser() {
    this.userService
      .getUser(this.userService.getUsername())
      .subscribe((data) => {
        this.user = data;
        console.log(data);
      });
  }

  checkEdit() {
    if (this.check === false) {
      this.check = true;
      this.acountForm.controls['currentPassword'].setValidators([
        Validators.minLength(8),
        Validators.maxLength(50),
        // Validators.pattern(
        //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        // ),
      ]);
      this.acountForm.controls['currentPassword'].updateValueAndValidity();
      this.acountForm.controls['newPassword'].setValidators([
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]);
      this.acountForm.controls['newPassword'].updateValueAndValidity();
      this.acountForm.controls['confirmPassword'].setValidators([
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]);
      this.acountForm.controls['confirmPassword'].updateValueAndValidity();
      // console.log(this.acountForm.controls['newPassword'].validator)
    } else {
      this.check = false;
      this.editOldPassword = '';
      this.editNewPassword = '';
      this.editConfirmPassword = '';
      this.acountForm.controls['currentPassword'].clearValidators();
      this.acountForm.controls['currentPassword'].updateValueAndValidity();
      this.acountForm.controls['newPassword'].clearValidators();
      this.acountForm.controls['newPassword'].updateValueAndValidity();
      this.acountForm.controls['confirmPassword'].clearValidators();
      this.acountForm.controls['confirmPassword'].updateValueAndValidity();
    }
    console.log(this.check);
  }

  checkEditAccount() {
    this.checkEditInfor = true;
  }

  update() {
    // console.log('update');
    const userUpdate = this.user;

    if (this.acountForm.invalid) {
      this.acountForm.markAllAsTouched();
      // console.log('false ' + this.acountForm.status);
      return;
    }

    userUpdate.username = this.acountForm.controls['username'].value;
    userUpdate.email = this.acountForm.controls['email'].value;
    userUpdate.password = this.acountForm.controls['currentPassword'].value;
    userUpdate.newPassword = this.acountForm.controls['newPassword'].value;

    // console.log('true ' + this.acountForm.status);

    // console.log(
    //   userUpdate.newPassword +
    //     ' ' +
    //     this.acountForm.controls['confirmPassword'].value
    // );

    if (
      this.check === true &&
      userUpdate.newPassword !=
        this.acountForm.controls['confirmPassword'].value
    ) {
      // console.log('false pass compare');
      this.checkPass = false;
      return;
    }

    this.userService.updateUser(userUpdate).subscribe(
      (data) => {
        // console.log(data);
        this.openSnackBar('Cập nhật thành công');
      },
      (error) => {
        console.log(error)
        var mess = '';
        if (error.error.errors) {
          var log = error.error.errors;
          // console.log(log)
          // console.log(error)
          for (let index = 0; index < log.length; index++) {
            console.log(log[index].defaultMessage);
            mess += log[index].defaultMessage + '\n';
          }
          this.openSnackBar('Cập nhật thất bại: \n' + mess);
        } else this.openSnackBar('Cập nhật thất bại: '+ error.error.status ? error.error.status:"");
      }
    );
  }

  openSnackBar(content: any) {
    this._snackBar.open(content, 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  get username() {
    return this.acountForm.get('username');
  }
  get email() {
    return this.acountForm.get('email');
  }
  get currentPassword() {
    return this.acountForm.get('currentPassword');
  }
  get newPassword() {
    return this.acountForm.get('newPassword');
  }
  get confirmPassword() {
    return this.acountForm.get('confirmPassword');
  }
}
