import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'isLoggedIn';
  private readonly userRoleKey = 'userRole';

  private isAuthenticated: boolean = false;
  private currentUserRole: string = '';

  constructor(private router: Router) {
    // Check if the login state is stored in local storage and update the login state accordingly
    const loginState = localStorage.getItem(this.storageKey);
    const userRoleState = localStorage.getItem(this.userRoleKey);
    if (loginState && userRoleState) {
      this.isAuthenticated = loginState === 'true';
      this.currentUserRole = userRoleState;
    }
  }

  // Perform authentication logic here (e.g., check credentials against a server).
  // For simplicity, we'll use static login credentials.
  login(username: string, password: string) {
    if (username === UserRole.USER && password === UserRole.USER) {
      this.isAuthenticated = true;
      this.currentUserRole = UserRole.USER;
      localStorage.setItem(this.userRoleKey, this.currentUserRole);
      this.router.navigate(['/products']);
    } else if (username === UserRole.ADMIN && password === UserRole.ADMIN) {
      this.isAuthenticated = true;
      this.currentUserRole = UserRole.ADMIN;
      localStorage.setItem(this.userRoleKey, this.currentUserRole);
      this.router.navigate(['/dashboard']);
    } else {
      this.isAuthenticated = false;
      this.currentUserRole = '';
    }
    // Store the login state in local storage
    localStorage.setItem(this.storageKey, this.isAuthenticated.toString());

    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUserRole = '';
    // Remove the login state from local storage
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.userRoleKey);

    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUserRole(): string {
    return this.currentUserRole;
  }
}
