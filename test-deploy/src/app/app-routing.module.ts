import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { PageName } from './shared/constants/routing.constant';
import { LoginComponent } from './auth/login/login.component';

const appRoutes: Routes = [
  { path: PageName.LOGIN_PAGE, component: LoginComponent },
  { path: '', redirectTo: PageName.LOGIN_PAGE, pathMatch: 'full'}

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
