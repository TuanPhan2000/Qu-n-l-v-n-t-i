import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Route } from 'src/app/data/route';
import { CoachTurnService } from 'src/app/service/coach-turn.service';
import { RouteService } from 'src/app/service/route.service';
import { ViewStatsComponent } from '../dialogs/view-stats/view-stats.component';

@Component({
  selector: 'app-revenue-stats-coach',
  templateUrl: './revenue-stats-coach.component.html',
  styleUrls: ['./revenue-stats-coach.component.scss']
})
export class RevenueStatsCoachComponent implements OnInit {

  formSearch!: FormGroup;

  dataList: any[] = [];

  dataSearch: any;

  displayedColumns: string[] = [
    'no',
    'id',
    'plate',
    'model',
    'manufacturer',
    'capacity',
    'years_of_use',
    'last_maintenance_day',
    'revenue',
    'action',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private coachTurnService: CoachTurnService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.makeSearchForm();
  }

  makeSearchForm() {
    this.formSearch = new FormGroup({
      startTime: new FormControl('',Validators.required),
      endTime: new FormControl('',Validators.required)
    });
  }


  onSearch(){
    var st = this.formSearch.controls['startTime'].value;
    var et = this.formSearch.controls['endTime'].value;

    var dateSt = new Date(st);
    var dateEt = new Date(et);

    st = this.formatTime(st);
    et = this.formatTime(et);

    this.dataSearch = {
      startTime: st,
      endTime: et
    }

    if(dateSt<dateEt){
      // this.openSnackBar(`Check thời gian đúng ${st} và ${et}`);
      this.coachTurnService.getRevenueCoachByTime(this.dataSearch).subscribe(
        data =>{
          console.log(data);
          this.dataList = data;
          console.log(this.dataList);
          this.dataSource = new MatTableDataSource<any>(this.dataList);
          this.dataSource.paginator = this.paginator;
        },
        error=>{
          this.openSnackBar('Thống kê thất bại');
        }
      )
    }else{
      this.openSnackBar(`Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc`);
    }
  }

  formatTime(timeFormat: any){
    timeFormat = timeFormat + '';
    const words = timeFormat.split(' (');
    var time = '';
    var date = new Date(words[0]);
    var d = words[0].split(' ');
    time = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} ${
      d[4]
    }`;
    return time;
  }

  openSnackBar(content: any) {
    this._snackBar.open(content, 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  openView(id: any){
    var viewSearch={
      id: id,
      startTime: this.dataSearch.startTime,
      endTime: this.dataSearch.endTime
    }
    this.coachTurnService.getListCoachTurnByIdCoachAndTime(viewSearch).subscribe(
      data =>{
        const dialogRef = this.dialog.open(ViewStatsComponent, {
          data: data
        });
      },
      error=>{

      }
    )
  }

}
