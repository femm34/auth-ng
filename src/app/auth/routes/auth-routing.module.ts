import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { AuthLayoutComponent } from '../components/auth-layout/auth-layout.component';
import { RegisterComponent } from '../components/register/register.component';
import { ResetPasswordRequestComponent } from '../components/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';


const routes: Routes = [
  {
    path: '',
    // component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'request-password-reset',
        component: ResetPasswordRequestComponent
      },
      {
        path: 'reset-password/:token',
        component: ResetPasswordComponent
      },
      {
        path: '**',
        redirectTo: 'login', // Redirige cualquier ruta no encontrada a login
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
