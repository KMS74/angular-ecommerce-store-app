import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../interfaces/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class LoginInAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn();
    const currentUserRole = this.authService.getCurrentUserRole();

    if (isLoggedIn && state.url.includes('/login')) {
      // User is already logged in, redirect to a different route
      currentUserRole === UserRole.USER
        ? this.router.navigate(['/products'])
        : this.router.navigate(['/dashboard']);

      return false;
    }

    // User is not logged in, allow access to the login route
    return true;
  }
}
