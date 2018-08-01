import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardPageComponent,
    AccountPageComponent,
    ChangePasswordPageComponent,
    ListingTutorsPageComponent,
    ListingStudentsPageComponent,
    ListingRequisitionsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
