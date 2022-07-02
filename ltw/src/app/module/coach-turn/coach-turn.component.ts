import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Route } from 'src/app/data/route';
import {CoachTurn} from "../../data/coach-turn";
import {CoachTurnService} from "../../service/coach-turn.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../dialogs/confirm-dialog/confirm-dialog.component";
import {AddCoachTurnComponent} from "../dialogs/add-coach-turn/add-coach-turn.component";
import {EditCoachTurnComponent} from "../dialogs/edit-coach-turn/edit-coach-turn.component";
import {Coach} from "../../data/coach";
import {RouteService} from "../../service/route.service";
import {CoachService} from "../../service/coach.service";
import {DriverService} from "../../service/driver.service";
import {Driver} from "../../data/driver";

@Component({
  selector: 'app-coach-turn',
  templateUrl: './coach-turn.component.html',
  styleUrls: ['./coach-turn.component.scss']
})
export class CoachTurnComponent implements OnInit {
  resultComfirm: string = '';
  formSearch!: FormGroup;

  coachTurnList: CoachTurn[] = [];

  coachList: Coach[]=[];
  routeList: Route[] =[];
  driverList: Driver[] = [];

  displayedColumns: string[] = [
    'no',
    'id',
    'passengerAmount',
    'ticketPrice',
    'startTime',
    'endTime',
    'coach',
    'route',
    'driver',
    'driverAsistant',
    'action',
  ];
  dataSource = new MatTableDataSource<CoachTurn>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private coachTurnService: CoachTurnService,
    private routeService: RouteService,
    private coachService: CoachService,
    private driverService: DriverService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private formBuider: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.makeSearchForm();
    this.getDataToAddOrEdit();
  }

  getDataToAddOrEdit(): void{
    this.routeService.getAll().subscribe((data)=>{
      this.routeList = data;
    })
    this.coachService.getAll().subscribe((data)=>{
      this.coachList = data;
    })
    this.driverService.getAll().subscribe((data)=>{
      this.driverList = data;
    })
  }

  getAll(): void{
    this.coachTurnService.getAll().subscribe((data)=>{
      console.log(data);
      this.coachTurnList = data;
      console.log(this.coachTurnList);
      this.dataSource = new MatTableDataSource<CoachTurn>(this.coachTurnList);
      this.dataSource.paginator = this.paginator
    })
  }

  makeSearchForm(): void{
    this.formSearch = new FormGroup({
      // id: new FormControl(''),
      ticketPriceMin:new FormControl(''),
      driverName:new FormControl(''),
      coachPlate:new FormControl(''),
      routeId:new FormControl(''),
    })
  }

  all() {
    this.getAll();
    this.makeSearchForm();
  }

  onSearch() {
    var param = {
      //id: this.formSearch.value.id,
      ticketPriceMin:this.formSearch.value.ticketPriceMin,
      driverName:this.formSearch.value.driverName,
      coachPlate:this.formSearch.value.coachPlate,
      routeId:this.formSearch.value.routeId,
    };

    console.log(param);

    this.coachTurnService.searchCoachTurn(param).subscribe((data) => {
      console.log(data);
      this.coachTurnList = data;
      console.log(this.coachTurnList);
      this.dataSource = new MatTableDataSource<CoachTurn>(this.coachTurnList);
      this.dataSource.paginator = this.paginator;
      this.openSnackBar('Tìm kiếm thành công');
    });

  }
  //thong bao tim kiem thanh cong
  openSnackBar(content: any) {
    this._snackBar.open(content, 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  //confirm delete
  confirmDialog(coachTurn: CoachTurn): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true) {
        console.log('delete');
        this.coachTurnService.deleteCoachTurn(coachTurn.id).subscribe(
          (data) => {
            this.openSnackBar('Xóa thành công');
            this.getAll();
          },
          (error) => {
            //this.openSnackBar('Xóa thất bại');
            this.openSnackBar(error.error.status);
          }
        );
      }
    });
  }
  //create
  openAddDialog() {
    this.getDataToAddOrEdit();
    const dialogRef = this.dialog.open(AddCoachTurnComponent, {
      data:{
        routeData: this.routeList,
        coachData: this.coachList,
        driverData: this.driverList,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.coachTurnService.createCoachTurn(result).subscribe(
          (data) => {
            this.openSnackBar('Thêm thành công');
            this.getAll();
          },
          (error) => {
            var print = '';
            var log = error.error.errors;
            if(log !=null)
              for (let index = 0; index < log.length; index++) {
                console.log(log[index].defaultMessage)
                print +=(' '+ log[index].defaultMessage);
              }
            else (error.error.status ? print+=error.error.status : "");
            this.openSnackBar("Thêm thất bại: "+ print);
            // this.getAll();
          }
        );
      }
    });
  }
  //edit
  openEditDialog(data: CoachTurn) {
    this.getDataToAddOrEdit();
    // console.log(this.List);
    // console.log(data)
    // data.endTime = new Date(data.endTime+'').toString();
    // console.log(data.endTime)
    const dialogRef = this.dialog.open(EditCoachTurnComponent, {
      data: {
        coachTurn: Object.assign(new CoachTurn(),data),
        routeData: this.routeList,
        coachData: this.coachList,
        driverData: this.driverList,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.coachTurnService.update(result).subscribe(
          (data) => {
            this.openSnackBar('Cập nhật thành công');
            this.getAll();
          },
          (error) => {
            // this.openSnackBar('Cập nhật thất bại');
            // console.log(error);
            // this.openSnackBar(error.error.status);
            var print = '';
            var log = error.error.errors;
            if(log !=null)
              for (let index = 0; index < log.length; index++) {
                console.log(log[index].defaultMessage)
                print +=(' '+ log[index].defaultMessage);
              }
            else (error.error.status ? print+=error.error.status : "");
            this.openSnackBar("Cập nhật thất bại: "+ print);
            this.getAll();
          }
        );
      }
    });
  }

}
