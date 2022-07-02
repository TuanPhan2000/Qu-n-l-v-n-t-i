import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coach } from 'src/app/data/coach';

@Component({
  selector: 'app-edit-coach',
  templateUrl: './edit-coach.component.html',
  styleUrls: ['./edit-coach.component.scss']
})
export class EditCoachComponent implements OnInit {
  formControl!: FormGroup ;
  constructor(
    public dialogRef: MatDialogRef<EditCoachComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Coach
  ) {}

  ngOnInit(): void {
    this.makeForm();
  }
  makeForm(){
    this.formControl = new FormGroup({
      "id":  new FormControl('',Validators.required),
      "plate":  new FormControl('',Validators.required),
      "model": new FormControl('',Validators.required),
      "manufacturer": new FormControl('',Validators.required),
      "capacity": new FormControl('',Validators.required),
      "yearsOfUse": new FormControl('',Validators.required),
      "lastMaintenanceDay": new FormControl('',Validators.required),
  });
  }
  edit(): void {
    // console.log(this.formControl.value);
    this.dialogRef.close(Object.assign(new Coach(), this.formControl.value));
  }
}
