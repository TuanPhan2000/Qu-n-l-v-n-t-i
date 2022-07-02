import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import { RouteComponent } from './module/route/route.component';
import { DriverComponent } from './module/driver/driver.component';
import { CoachComponent } from './module/coach/coach.component';
import { CoachTurnComponent } from './module/coach-turn/coach-turn.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/share/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './module/dialogs/confirm-dialog/confirm-dialog.component';
// import { AddRouteComponent } from './module/dialogs/add-route/add-route.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRouteComponent } from './module/dialogs/add-route/add-route.component';
import { EditRouteComponent } from './module/dialogs/edit-route/edit-route.component';
import { LoginComponent } from './authen/login/login.component';
import { AddDriverComponent } from './module/dialogs/add-driver/add-driver.component';
import { EditDriverComponent } from './module/dialogs/edit-driver/edit-driver.component';
import { AddCoachComponent } from './module/dialogs/add-coach/add-coach.component';
import { EditCoachComponent } from './module/dialogs/edit-coach/edit-coach.component';
import { AddCoachTurnComponent } from './module/dialogs/add-coach-turn/add-coach-turn.component';
import { EditCoachTurnComponent } from './module/dialogs/edit-coach-turn/edit-coach-turn.component';
import { SalaryComponent } from './module/salary/salary.component';
import { RevenueStatsCoachComponent } from './module/revenue-stats-coach/revenue-stats-coach.component';
import { ViewStatsComponent } from './module/dialogs/view-stats/view-stats.component';
import { AccountComponent } from './authen/account/account.component';
import { ResetPasswordComponent } from './authen/reset-password/reset-password.component';
// import { LoginComponent } from './login/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RouteComponent,
    DriverComponent,
    CoachComponent,
    CoachTurnComponent,
    ConfirmDialogComponent,
    AddRouteComponent,
    EditRouteComponent,
    LoginComponent,
    AddDriverComponent,
    EditDriverComponent,
    AddCoachComponent,
    EditCoachComponent,
    AddCoachTurnComponent,
    EditCoachTurnComponent,
    SalaryComponent,
    RevenueStatsCoachComponent,
    ViewStatsComponent,
    AccountComponent,
    ResetPasswordComponent
    // AddRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AddRouteComponent,
    EditRouteComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
