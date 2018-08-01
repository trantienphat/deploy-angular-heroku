import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { PageName } from './shared/constants/routing.constant';
import { LoginComponent } from './auth/login/login.component';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';
import { AccountPageComponent } from './containers/account-page/account-page.component';
import { ChangePasswordPageComponent } from './containers/change-password-page/change-password-page.component';
import { ListingTutorsPageComponent } from './containers/listing-tutors-page/listing-tutors-page.component';
import { ListingStudentsPageComponent } from './containers/listing-students-page/listing-students-page.component';
import { ListingRequisitionsPageComponent } from './containers/listing-requisitions-page/listing-requisitions-page.component';

const appRoutes: Routes = [
  { path: PageName.LOGIN_PAGE, component: LoginComponent },
  { path: '', redirectTo: PageName.LOGIN_PAGE, pathMatch: 'full'},
  { path: PageName.DASHBOARD_PAGE, component: DashboardPageComponent },
  { path: PageName.ACCOUNT_PAGE, component: AccountPageComponent },
  { path: PageName.CHANGE_PASSWORD_PAGE, component: ChangePasswordPageComponent },
  { path: PageName.LISTING_TUTOR_PAGE, component: ListingTutorsPageComponent },
  { path: PageName.LISTING_STUDENT_PAGE, component: ListingStudentsPageComponent },
  { path: PageName.LISTING_REQUISITION_PAGE, component: ListingRequisitionsPageComponent }
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
