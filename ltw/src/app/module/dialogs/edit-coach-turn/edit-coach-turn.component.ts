import { Component, Inject, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoachTurn } from '../../../data/coach-turn';
import * as _moment from 'moment';
import { FixedSalary } from 'src/app/data/fixed-salary';
const moment =  _moment;
@Component({
  selector: 'app-edit-coach-turn',
  templateUrl: './edit-coach-turn.component.html',
  styleUrls: ['./edit-coach-turn.component.scss'],
  providers: [
  ],
})
export class EditCoachTurnComponent implements OnInit {
  @ViewChild('picker') picker: any;

   dateEnd : any;
   dateStart: any;

  formControl1!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditCoachTurnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.makeForm();
    this.dateEnd = new Date(this.data.coachTurn.endTime);
    this.dateStart = new Date(this.data.coachTurn.startTime);
  }
  makeForm(): void {
    this.formControl1 = new FormGroup({
      id: new FormControl('', Validators.required),
      passengerAmount: new FormControl('', Validators.required),
      ticketPrice: new FormControl('', Validators.required),
      startTime: new FormControl(moment(), Validators.required),
      endTime: new FormControl(moment(), Validators.required),
      // gradeSalary: new FormControl('', Validators.required),
      coach: new FormControl('', Validators.required),
      route: new FormControl('', Validators.required),
      driver: new FormControl('', Validators.required),
      driverAsistant: new FormControl('', Validators.required),
    });
  }

  getFormattedDate(data: any) {
     data = data + '';
     const words = data.split(' (');
     var time = '';
     var date = new Date(words[0]);

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
    var sTime = data.toLocaleTimeString();
    sTime = sTime.slice(0,-3)
    if(sTime.length < 8){
      sTime = '0'+sTime;
    }
    var s = year + '-' + sMonth + '-' + sDay + 'T' + sTime;

    return s;
  }

  edit(): void {
    var editData = new CoachTurn();
    Object.assign(editData, this.formControl1.value);
    // editData.startTime = this.getFormattedDate(editData.startTime);
    // editData.endTime = this.getFormattedDate(editData.endTime);
  console.log("endTime:"+editData.endTime);

    editData.endTime = editData.endTime + '';
    const words = editData.endTime.split(' (');
    var time = '';
    var date = new Date(words[0]);
    var d = words[0].split(' ');

    time = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate() }` : date.getDate() }T${
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
    }-${date2.getDate() < 10 ? `0${date2.getDate()}` : date2.getDate() }T${
      d2[4]
    }`;
    console.log(time2);
    editData.startTime = time2;

    editData.coach = {
      id: this.formControl1.value.coach,
      plate: '',
      model: '',
      manufacturer: '',
      capacity: 0,
      yearsOfUse: 0,
      lastMaintenanceDay: new Date(),
    };

    editData.driver = {
      id: this.formControl1.value.driver,
      name: '',
      idCard: '',
      drivingLicenseCode: '',
      typeOfLicense: '',
      address: '',
      birthday: new Date(),
      experience: 0,
      fixedSalary: new FixedSalary(),
    };

    editData.route = {
      id: this.formControl1.value.route,
      pointOfDeparture: '',
      destination: '',
      length: 0,
      complexity: 0,
    };

    editData.driverAsistant = {
      id: this.formControl1.value.driverAsistant,
      name: '',
      idCard: '',
      drivingLicenseCode: '',
      typeOfLicense: '',
      address: '',
      birthday: new Date(),
      experience: 0,
      fixedSalary: new FixedSalary(),
    };

    this.dialogRef.close(editData);
  }
}
