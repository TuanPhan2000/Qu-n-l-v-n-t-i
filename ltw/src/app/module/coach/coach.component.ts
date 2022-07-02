import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Coach } from 'src/app/data/coach';
import { CoachService } from 'src/app/service/coach.service';
import { AddCoachComponent } from '../dialogs/add-coach/add-coach.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../dialogs/confirm-dialog/confirm-dialog.component';
import { EditCoachComponent } from '../dialogs/edit-coach/edit-coach.component';


@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {
  resultComfirm: string = '';
  formSearch!: FormGroup;
  coachList: Coach[]=[];
  displayedColumns: string[] = [
    'no',
    'id',
    'plate',
    'model',
    'manufacturer',
    'capacity',
    'yearsOfUse',
    'lastMaintenanceDay',
    'action',
  ];
  dataSource = new MatTableDataSource<Coach>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private coachService: CoachService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.makeSearchForm();
  }
  makeSearchForm() {
    this.formSearch = new FormGroup({
      id: new FormControl(''),
      plate: new FormControl(''),
      model: new FormControl(''),
      manufacturer: new FormControl(''),
      capacity: new FormControl(''),
      yearsOfUse: new FormControl(''),
      lastMaintenanceDay: new FormControl(''),
    });
    }
    getAll(): void {
      this.coachService.getAll().subscribe((data) => {
        console.log(data);
        this.coachList = data;
        console.log(this.coachList);
        this.dataSource = new MatTableDataSource<Coach>(this.coachList);
        this.dataSource.paginator = this.paginator;
      });
    }
    all() {
      this.getAll();
      this.makeSearchForm();
    }
    onSearch() {
      var param = {
        id: this.formSearch.value.id,
        plate: this.formSearch.value.plate,
        model: this.formSearch.value.model,
        manufacturer: this.formSearch.value.manufacturer,
        capacity: this.formSearch.value.capacity,
        yearsOfUse: this.formSearch.value.yearsOfUse,
        lastMaintenanceDay: this.formSearch.value.lastMaintenanceDay,

      };
      console.log(param);

    this.coachService.searchCoach(param).subscribe((data) => {
      console.log(data);
      this.coachList = data;
      console.log(this.coachList);
      this.dataSource = new MatTableDataSource<Coach>(this.coachList);
      this.dataSource.paginator = this.paginator;
      this.openSnackBar('Tìm kiếm thành công');
    });
  }
  confirmDialog(coach: Coach): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true) {
        console.log('delete');
        this.coachService.deleteCoach(coach.id).subscribe(
          (data) => {
            this.openSnackBar('Xóa thành công');
            this.getAll();
          },
          (error) => {
            this.openSnackBar('Xóa thất bại');
          }
        );
      }
    });
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddCoachComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.coachService.createCoach(result).subscribe(
          (data) => {
            this.openSnackBar('Thêm thành công');
            this.getAll();
          },
          (error) => {
            console.log(error)
        var mess = '';
        if (error.error.errors) {
          var log = error.error.errors;
          // console.log(log)
          // console.log(error)
          for (let index = 0; index < log.length; index++) {
            console.log(log[index].defaultMessage);
            mess += log[index].defaultMessage + '\n';
          }
          this.openSnackBar('Thêm thất bại: \n' + mess);
        } else this.openSnackBar('Thêm thất bại: '+ error.error.status ? error.error.status:"");
          }
        );
      }
    });
  }
  openEditDialog(data?: Coach) {
    // console.log(data)
    const dialogRef = this.dialog.open(EditCoachComponent, {
      data: Object.assign(new Coach(),data),
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.coachService.update(result).subscribe(
          (data) => {
            this.openSnackBar('cập nhật thành công');
            this.getAll();
          },
          (error) => {
            console.log(error)
            var mess = '';
            if (error.error.errors) {
              var log = error.error.errors;
              // console.log(log)
              // console.log(error)
              for (let index = 0; index < log.length; index++) {
                console.log(log[index].defaultMessage);
                mess += log[index].defaultMessage + '\n';
              }
              this.openSnackBar('Cập nhật thất bại: \n' + mess);
            } else this.openSnackBar('Cập nhật thất bại: '+ error.error.status ? error.error.status:"");
          }
        );
      }
    });
  }
  openSnackBar(content: any) {
    this._snackBar.open(content, 'OK', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
