import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { SharedService } from './shared/services/shared.service';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    DashboardPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
