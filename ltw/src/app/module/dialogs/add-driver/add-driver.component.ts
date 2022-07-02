import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Driver } from 'src/app/data/driver';
import { DriverService } from 'src/app/service/driver.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss'],
})
export class AddDriverComponent implements OnInit {
  formControl!: FormGroup ;
  constructor(
    public dialogRef: MatDialogRef<AddDriverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    this.makeForm();
    // this.formControl.setValue(this.data);
  }

makeForm(){
    this.formControl = new FormGroup({
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

save(): void {
  var addData = new Driver();
  Object.assign(addData, this.formControl.value);
  this.dialogRef.close(addData);
}
}
