import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { SharedService } from './shared/services/shared.service';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';
import { AccountPageComponent } from './containers/account-page/account-page.component';
import { ChangePasswordPageComponent } from './containers/change-password-page/change-password-page.component';
import { ListingTutorsPageComponent } from './containers/listing-tutors-page/listing-tutors-page.component';
import { ListingStudentsPageComponent } from './containers/listing-students-page/listing-students-page.component';
import { ListingRequisitionsPageComponent } from './containers/listing-requisitions-page/listing-requisitions-page.component';
import { CardUserInfoComponent } from './shared/components/card-user-info/card-user-info.component';
import { AuthorizationTypeService } from './shared/services/authorization-type.service';
import { VerificationDocumentService } from './shared/services/verification-document.service';
import { BannerService } from './shared/services/banner.service';
import { DegreeService } from './shared/services/degree.service';
import { HttpService } from './shared/services/http.service';
import { RequisitionCourseService } from './shared/services/requisition-course.service';
import { SpecializationService } from './shared/services/specialization.service';
import { SubjectService } from './shared/services/subject.service';
import { UserService } from './shared/services/user.service';
import { VerificationDocumentTypeService } from './shared/services/verification-document-type.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { DashboardService } from './containers/dashboard-page/dashboard.service';
import { RequisitionDetailsComponent } from './containers/listing-requisitions-page/requisition-details/requisition-details.component';
import { StudentDetailsComponent } from './containers/listing-students-page/student-details/student-details.component';
import { TutorDetailsComponent } from './containers/listing-tutors-page/tutor-details/tutor-details.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { CardVerificationInfoComponent } from './shared/components/card-verification-info/card-verification-info.component';
import { ListingBannedUserComponent } from './containers/listing-banned-user/listing-banned-user.component';
import { DetailsBannedUserComponent } from './containers/listing-banned-user/details-banned-user/details-banned-user.component';
import { BannedCardComponent } from './containers/listing-banned-user/banned-card/banned-card.component';
import { BannedService } from './shared/services/banned.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardPageComponent,
    AccountPageComponent,
    ChangePasswordPageComponent,
    ListingTutorsPageComponent,
    ListingStudentsPageComponent,
    ListingRequisitionsPageComponent,
    CardUserInfoComponent,
    RequisitionDetailsComponent,
    StudentDetailsComponent,
    TutorDetailsComponent,
    LoadingComponent,
    CardVerificationInfoComponent,
    ListingBannedUserComponent,
    DetailsBannedUserComponent,
    BannedCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      maxOpened: 3,
      progressBar: true
    })
  ],
  providers: [
    SharedService,
    AuthService,
    AuthGuardService,
    AuthorizationTypeService,
    BannerService,
    DegreeService,
    HttpService,
    RequisitionCourseService,
    SpecializationService,
    SubjectService,
    UserService,
    VerificationDocumentTypeService,
    VerificationDocumentService,
    DashboardService,
    BannedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
