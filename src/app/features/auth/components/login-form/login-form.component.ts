import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';
  constructor(private authService: AuthService) {}
  login() {
    this.authService.login(this.username, this.password);
  }
}
