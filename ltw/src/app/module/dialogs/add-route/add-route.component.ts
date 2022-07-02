import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route } from 'src/app/data/route';
import { RouteService } from 'src/app/service/route.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss'],
})
export class AddRouteComponent implements OnInit {
  formControl!: FormGroup ;
  constructor(
    public dialogRef: MatDialogRef<AddRouteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

    this.makeForm();
    // this.formControl.setValue(this.data);
  }

makeForm(){
    this.formControl = new FormGroup({
      "pointOfDeparture":  new FormControl('',Validators.required),
      "destination": new FormControl('',Validators.required),
      "length": new FormControl('',Validators.required),
      "complexity": new FormControl('',Validators.required),
  });
}

save(): void {
  // console.log(this.formControl.value);
  this.dialogRef.close(Object.assign(new Route(), this.formControl.value));
}
}
