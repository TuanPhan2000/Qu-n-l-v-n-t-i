import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route } from 'src/app/data/route';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.scss'],
})
export class EditRouteComponent implements OnInit {
  formControl1!: FormGroup ;
  constructor(
    public dialogRef: MatDialogRef<EditRouteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    this.makeForm();
    // this.formControl.setValue(this.data);
  }

makeForm(){
    this.formControl1 = new FormGroup({
      "id":  new FormControl('',Validators.required),
      "pointOfDeparture":  new FormControl('',Validators.required),
      "destination": new FormControl('',Validators.required),
      "length": new FormControl('',Validators.required),
      "complexity": new FormControl('',Validators.required),
  });
}


  edit(): void {
    // console.log(this.formControl.value);
    this.dialogRef.close(Object.assign(new Route(), this.formControl1.value));
  }
}
