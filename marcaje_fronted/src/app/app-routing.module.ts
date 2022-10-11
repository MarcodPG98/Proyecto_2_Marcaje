import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { MarcajeComponent } from './components/marcaje/marcaje.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [BeforeLoginService]},
    {path: 'register', component: RegisterComponent, canActivate: [BeforeLoginService]},
    {path: 'profile', component: ProfileComponent, canActivate: [AfterLoginService]},
    {path: 'request-password-reset', component: RequestResetComponent, canActivate: [BeforeLoginService]},
    {path: 'response-password-reset', component: ResponseResetComponent, canActivate: [BeforeLoginService]},
    {path: 'marcaje/:id', component: MarcajeComponent, canActivate: [AfterLoginService]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
