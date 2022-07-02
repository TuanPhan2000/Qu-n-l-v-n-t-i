import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _moment from 'moment';
import { Route } from 'src/app/data/route';
import {TotalSalary} from "../../data/total-salary";
import {SalaryService} from "../../service/salary.service";
import {MatSnackBar} from "@angular/material/snack-bar";
// import {default as _rollupMoment} from 'moment';
// import moment = require('moment');
type Moment = moment.Moment;
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SalaryComponent implements OnInit {

  totalSalaryList: any[] = [];
  flag: number=0;
  yearSearch: number =0;
  monthSearch: number =0;

  date = new FormControl(moment());
  displayedColumns: string[] = [
    'no',
    'driverId',
    'driverName',
    'month',
    'year',
    'total',
  ];
  dataSource = new MatTableDataSource<TotalSalary>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    private salaryService: SalaryService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.yearSearch = ctrlValue.year();
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.monthSearch = ctrlValue.month() + 1;
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  onSearch(){
    console.log("search: " + this.monthSearch +" " + this.yearSearch)
    this.flag=0;
    this.salaryService.findTotalSalaryByMonthAndYear(this.monthSearch,this.yearSearch).subscribe((data)=>{
      
      console.log(data);
      this.totalSalaryList = data;
      console.log("totalSalaryList:"+this.totalSalaryList);
      this.dataSource = new MatTableDataSource<TotalSalary>(this.totalSalaryList);
      this.dataSource.paginator = this.paginator;
      this.openSnackBar('Tìm kiếm thành công');
    })
  }
  //thong bao tim kiem thanh cong
  openSnackBar(content: any) {
    this._snackBar.open(content, 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  viewSalaryCurrent(){
    this.salaryService.getCurrentMonthSalary().subscribe((data)=>{
      this.flag=1;
      console.log(data)
      this.totalSalaryList = data;
      console.log("totalSalaryList:"+this.totalSalaryList);
      this.dataSource = new MatTableDataSource<any>(this.totalSalaryList);
      this.dataSource.paginator = this.paginator;
      this.openSnackBar('Xem thành công');
    })
  }

  addDatabase(){
    if(this.flag==0){
      this.openSnackBar("Lỗi: Chỉ xuất được lương của tháng này")
    }else{
      
      this.salaryService.saveToDB(this.totalSalaryList).subscribe(
        (data)=>{
          this.openSnackBar("Thêm lương tháng này công vào CSDL")
        },
        (error) => {
          this.openSnackBar(error.error.status);
          // this.getAll();
        }
      );
    }
    
  }

}
