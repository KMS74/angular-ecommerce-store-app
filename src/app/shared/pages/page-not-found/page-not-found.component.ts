import { Component } from '@angular/core';
import { UserRole } from 'src/app/core/interfaces/user-role.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  constructor(private authService: AuthService) {}

  redirectionRoute() {
    if (this.authService.isLoggedIn()) {
      const currentUserRole = this.authService.getCurrentUserRole();

      return currentUserRole === UserRole.USER ? '/products' : '/dashboard';
    }

    return '/login';
  }
}
