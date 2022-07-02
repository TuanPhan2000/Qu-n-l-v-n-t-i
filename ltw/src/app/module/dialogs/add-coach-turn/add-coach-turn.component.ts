import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoachTurn} from "../../../data/coach-turn";

@Component({
  selector: 'app-add-coach-turn',
  templateUrl: './add-coach-turn.component.html',
  styleUrls: ['./add-coach-turn.component.scss']
})
export class AddCoachTurnComponent implements OnInit {

  dateEnd : any;
  dateStart: any;

  formControl!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddCoachTurnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.makeForm();
    this.dateEnd = new Date();
    this.dateStart = new Date();
  }
  makeForm():void{
    this.formControl = new FormGroup({
      // "id":  new FormControl('',Validators.required),
      "passengerAmount": new FormControl('', Validators.required),
      "ticketPrice": new FormControl('', Validators.required),
      "startTime": new FormControl('', Validators.required),
      "endTime": new FormControl('', Validators.required),
      // "gradeSalary": new FormControl('', Validators.required),
      "coach": new FormControl('', Validators.required),
      "route": new FormControl('', Validators.required),
      "driver": new FormControl('', Validators.required),
      "driverAsistant": new FormControl('', Validators.required),
    })
  }

  getFormattedDate(date: any) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear().toString();
    var sDay = day.toString();
    var sMonth = month.toString();
    if (day < 10){
      sDay = '0' +sDay;
    }
    if(month <10){
      sMonth = '0' + sMonth;
    }
    var s = year + '-' + sMonth + '-' + sDay + 'T' + date.toLocaleTimeString();
    s= s.slice(0,-3)
    return s;
  }

  save(): void {
    var editData = new CoachTurn();

    Object.assign(editData, this.formControl.value);
    editData.endTime = editData.endTime + '';
    const words = editData.endTime.split(' (');
    var time = '';
    var date = new Date(words[0]);
    var d = words[0].split(' ');

    time = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate()+1 < 10 ? `0${date.getDate() + 1}` : date.getDate() + 1}T${
      d[4]
    }`;
    console.log(time);
    editData.endTime = time;


    editData.startTime = editData.startTime + '';
    const words2 = editData.startTime.split(' (');
    var time2 = '';
    var date2 = new Date(words2[0]);
    var d2 = words2[0].split(' ');
    time2 = `${date2.getFullYear()}-${
      date2.getMonth() + 1 < 10 ? `0${date2.getMonth() + 1}` : date2.getMonth() + 1
    }-${date2.getDate()+1 < 10 ? `0${date2.getDate() + 1}` : date2.getDate() + 1}T${
      d2[4]
    }`;
    console.log(time2);
    editData.startTime = time2;
    this.dialogRef.close(editData);

    // this.dialogRef.close(Object.assign(new CoachTurn(), this.formControl.value));

  }

}
