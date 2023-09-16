import { NgModule } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoginFormComponent, LoginPageComponent],
  imports: [CommonModule, FormsModule, SharedModule, TranslateModule],
  exports: [LoginFormComponent, LoginPageComponent],
})
export class AuthModule {}
