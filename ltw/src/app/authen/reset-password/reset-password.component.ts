import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route } from 'src/app/data/route';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  formControl!: FormGroup ;
  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    private _snackBar: MatSnackBar,
    public userService: UserService
  ) {}

  ngOnInit(): void {

    this.makeForm();
  }

makeForm(){
    this.formControl = new FormGroup({
      "username":  new FormControl('',Validators.required)
  });
}

save(): void {
  const username = this.formControl.get('username')?.value;
  this.userService.resetPassword(username).subscribe(
    (data) => {
      console.log(data);
      this.openSnackBar('Mật khẩu đã được gửi vào email, vui lòng kiểm tra email');
      this.dialogRef.close();
    },
    (error) => {
      console.log(error)
      this.openSnackBar(error.error.status);
    }
  )
}

openSnackBar(content: any) {
  this._snackBar.open(content, 'OK', {
    horizontalPosition: 'right',
    verticalPosition: 'top',
  });
}

}
