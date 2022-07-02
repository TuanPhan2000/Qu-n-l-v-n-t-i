import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './authen/login/login.component';
import { CoachTurnComponent } from './module/coach-turn/coach-turn.component';
import { CoachComponent } from './module/coach/coach.component';
import { DriverComponent } from './module/driver/driver.component';
import { RevenueStatsCoachComponent } from './module/revenue-stats-coach/revenue-stats-coach.component';
import { RouteComponent } from './module/route/route.component';
import { SalaryComponent } from './module/salary/salary.component';
import { AccountComponent } from './authen/account/account.component';

const routes: Routes = [
  {path: '',component: AppComponent, canActivate: [AuthGuard]},
  {path: 'home',component: AppComponent, canActivate: [AuthGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'route' , component: RouteComponent, canActivate: [AuthGuard]},
  {path: 'driver' , component: DriverComponent, canActivate: [AuthGuard]},
  {path: 'coach' , component: CoachComponent, canActivate: [AuthGuard]},
  {path: 'coach-turn' , component: CoachTurnComponent, canActivate: [AuthGuard]},
  {path: 'revenue-stats-coach' , component: RevenueStatsCoachComponent, canActivate: [AuthGuard]},
  {path: 'salary' , component: SalaryComponent, canActivate: [AuthGuard]},
  {path: 'account' , component: AccountComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
