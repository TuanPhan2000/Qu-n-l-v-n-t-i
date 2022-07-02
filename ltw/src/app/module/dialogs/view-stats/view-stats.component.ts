import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CoachTurn } from 'src/app/data/coach-turn';
import { Route } from 'src/app/data/route';

@Component({
  selector: 'app-view-stats',
  templateUrl: './view-stats.component.html',
  styleUrls: ['./view-stats.component.scss']
})
export class ViewStatsComponent implements OnInit {
  displayedColumns: string[] = [
    'no',
    'id',
    'passengerAmount',
    'ticketPrice',
    'startTime',
    'endTime',
    // 'coach',
    'route',
    'driver',
    'driverAsistant',
  ];
  dataSource = new MatTableDataSource<CoachTurn>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public dialogRef: MatDialogRef<ViewStatsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CoachTurn[]
  ) {
    this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

}
