import { Component } from '@angular/core';
import { AuthService, UserRole } from 'src/app/services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get isLoggedInUser(): boolean {
    return (
      this.authService.isLoggedIn() &&
      this.authService.getCurrentUserRole() === UserRole.USER
    );
  }

  get isLoggedInAdmin(): boolean {
    return (
      this.authService.isLoggedIn() &&
      this.authService.getCurrentUserRole() === UserRole.ADMIN
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  logout() {
    this.authService.logout();
  }
}
