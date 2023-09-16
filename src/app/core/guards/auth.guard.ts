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
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn();

    const requiredRole: UserRole = next.data['requiredRole'];

    const currentUserRole = this.authService.getCurrentUserRole();

    if (!isLoggedIn) {
      // User is not logged in, redirect to login page
      return this.router.parseUrl('/login');
    }

    if (requiredRole && currentUserRole !== requiredRole) {
      // User does not have the required role, navigate to unauthorized page or redirect to a different route
      return this.router.parseUrl('/unauthorized');
    }

    // User is authenticated and has the required role, allow access to the route
    return true;
  }
}
