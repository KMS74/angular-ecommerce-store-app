import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language.service';
import { UserRole } from 'src/app/core/interfaces/user-role.enum';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  currentLang: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService,
    private languageService: LanguageService
  ) {}

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

  changeCurrentLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
}
