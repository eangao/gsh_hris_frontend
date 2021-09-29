import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ForgotComponent } from './forgot/forgot.component';
import { OtpComponent } from './otp/otp.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, ForgotComponent, OtpComponent, LockscreenComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule

  ]
})
export class LoginModule { }
