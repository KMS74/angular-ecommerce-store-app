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
  private isAuthenticated: boolean = false;
  private currentUserRole: string = '';

  constructor(private router: Router) {}

  // Perform authentication logic here (e.g., check credentials against a server).
  // For simplicity, we'll use static login credentials.
  login(username: string, password: string) {
    if (username === UserRole.USER && password === UserRole.USER) {
      this.isAuthenticated = true;
      this.currentUserRole = UserRole.USER;
      this.router.navigate(['/products']);
    } else if (username === UserRole.ADMIN && password === UserRole.ADMIN) {
      this.isAuthenticated = true;
      this.currentUserRole = 'admin';
      this.router.navigate(['/dashboard']);
    }

    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUserRole = '';
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUserRole(): string {
    return this.currentUserRole;
  }
}
