import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coach } from 'src/app/data/coach';
import { CoachService } from 'src/app/service/coach.service';

@Component({
  selector: 'app-add-coach',
  templateUrl: './add-coach.component.html',
  styleUrls: ['./add-coach.component.scss']
})
export class AddCoachComponent implements OnInit {
  formControl!: FormGroup ;
  constructor(
    public dialogRef: MatDialogRef<AddCoachComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Coach
  ) { }

  ngOnInit(): void {
    this.makeForm();
  }
  makeForm(){
    this.formControl = new FormGroup({
      "plate":  new FormControl('',Validators.required),
      "model": new FormControl('',Validators.required),
      "manufacturer": new FormControl('',Validators.required),
      "capacity": new FormControl('',Validators.required),
      "yearsOfUse": new FormControl('',Validators.required),
      "lastMaintenanceDay": new FormControl('',Validators.required),
  });
  }
  save(): void {
    // console.log(this.formControl.value);
    this.dialogRef.close(Object.assign(new Coach(), this.formControl.value));
  }
}
