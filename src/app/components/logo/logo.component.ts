import { Component } from '@angular/core';
import { AuthService, UserRole } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  constructor(private authService: AuthService) {}

  redirectionRoute() {
    if (this.authService.isLoggedIn()) {
      const currentUserRole = this.authService.getCurrentUserRole();
      // console.log(
      //   'logged in and redirecting based on user role',
      //   currentUserRole
      // );
      return currentUserRole === UserRole.USER ? '/products' : '/dashboard';
    }
    // console.log('not logged in and redirecting to login page');

    return '/login';
  }
}
