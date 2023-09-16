import { Component } from '@angular/core';
import { UserRole } from 'src/app/core/interfaces/user-role.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  constructor(private authService: AuthService) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  redirectionRoute() {
    if (this.authService.isLoggedIn()) {
      const currentUserRole = this.authService.getCurrentUserRole();
      return currentUserRole === UserRole.USER ? '/products' : '/dashboard';
    }

    return '/login';
  }
}
