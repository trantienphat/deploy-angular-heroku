import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { PageName } from './shared/constants/routing.constant';
import { LoginComponent } from './auth/login/login.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';

const appRoutes: Routes = [
  { path: PageName.LOGIN_PAGE, component: LoginComponent },
  { path: '', redirectTo: PageName.LOGIN_PAGE, pathMatch: 'full'},
  { path: PageName.HOME_PAGE, component: HomePageComponent },
  { path: PageName.DASHBOARD_PAGE, component: DashboardPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
