
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Driver } from 'src/app/data/driver';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.scss'],
})
export class EditDriverComponent implements OnInit {
  formControl!: FormGroup ;
  constructor(
    public dialogRef: MatDialogRef<EditDriverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    this.makeForm();
    // this.formControl.setValue(this.data);
  }

makeForm(){
    this.formControl = new FormGroup({
      "id":  new FormControl('',Validators.required),
      "name":  new FormControl('',Validators.required),
      "idCard": new FormControl('',Validators.required),
      "drivingLicenseCode": new FormControl('',Validators.required),
      "typeOfLicense": new FormControl('',Validators.required),
      "address": new FormControl('',Validators.required),
      "birthday": new FormControl('',Validators.required),
      "experience": new FormControl('',Validators.required),
      "fixedSalary": new FormControl('',Validators.required),
  });
}


  edit(): void {
    // console.log(this.formControl.value);
    var editData = new Driver();
    Object.assign(editData, this.formControl.value);
    editData.fixedSalary = {
      id: this.formControl.value.fixedSalary,
      grade: 0,
      basicSalary: 0,
    };
    this.dialogRef.close(editData);
  }
}
