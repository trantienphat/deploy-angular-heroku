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
import { AuthGuardService } from './auth/auth-guard.service';
import { RequisitionDetailsComponent } from './containers/listing-requisitions-page/requisition-details/requisition-details.component';
import { StudentDetailsComponent } from './containers/listing-students-page/student-details/student-details.component';
import { TutorDetailsComponent } from './containers/listing-tutors-page/tutor-details/tutor-details.component';
import { CardVerificationInfoComponent } from './shared/components/card-verification-info/card-verification-info.component';
import { DetailsBannedUserComponent } from './containers/listing-banned-user/details-banned-user/details-banned-user.component';
import { ListingBannedUserComponent } from './containers/listing-banned-user/listing-banned-user.component';

const appRoutes: Routes = [
  { path: PageName.LOGIN_PAGE, component: LoginComponent },
  { path: '', redirectTo: PageName.LOGIN_PAGE, pathMatch: 'full'},
  { path: PageName.DASHBOARD_PAGE, component: DashboardPageComponent, canActivate: [AuthGuardService] },
  { path: PageName.ACCOUNT_PAGE, component: AccountPageComponent, canActivate: [AuthGuardService] },
  { path: PageName.CHANGE_PASSWORD_PAGE, component: ChangePasswordPageComponent, canActivate: [AuthGuardService] },
  { path: PageName.LISTING_TUTOR_PAGE, component: ListingTutorsPageComponent, canActivate: [AuthGuardService] },
  { path: PageName.LISTING_STUDENT_PAGE, component: ListingStudentsPageComponent, canActivate: [AuthGuardService] },
  { path: PageName.LISTING_REQUISITION_PAGE, component: ListingRequisitionsPageComponent, canActivate: [AuthGuardService] },
  { path: PageName.DETAILS_REQUISITION_COURSE_PAGE, component: RequisitionDetailsComponent, canActivate: [AuthGuardService] },
  { path: PageName.DETAILS_REQUISITION_COURSE_PAGE + '/:id', component: RequisitionDetailsComponent, canActivate: [AuthGuardService] },
  { path: PageName.DETAILS_STUDENT_INFO_PAGE, component: StudentDetailsComponent, canActivate: [AuthGuardService] },
  { path: PageName.DETAILS_STUDENT_INFO_PAGE + '/:id', component: StudentDetailsComponent, canActivate: [AuthGuardService] },
  { path: PageName.DETAILS_TUTOR_INFO_PAGE, component: TutorDetailsComponent, canActivate: [AuthGuardService] },
  { path: PageName.DETAILS_TUTOR_INFO_PAGE + '/:id', component: TutorDetailsComponent, canActivate: [AuthGuardService] },
  { path: PageName.DATAILS_VERIFICATION_DOCUMENT, component: CardVerificationInfoComponent, canActivate: [AuthGuardService] },
  { path: PageName.DATAILS_VERIFICATION_DOCUMENT + '/:id', component: CardVerificationInfoComponent, canActivate: [AuthGuardService] },
  { path: PageName.LISTING_BANNED_PAGE, component: ListingBannedUserComponent, canActivate: [AuthGuardService] },
  { path: PageName.DETAILS_BANNED, component: DetailsBannedUserComponent, canActivate: [AuthGuardService] },
  { path: PageName.DETAILS_BANNED + '/:id', component: DetailsBannedUserComponent, canActivate: [AuthGuardService] },
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
