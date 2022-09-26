import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent, pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, pathMatch: 'full'},
    {path: 'profile', component: ProfileComponent, pathMatch: 'full'},
    {path: 'request-password-reset', component: RequestResetComponent, pathMatch: 'full'},
    {path: 'response-password-reset', component: ResponseResetComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
