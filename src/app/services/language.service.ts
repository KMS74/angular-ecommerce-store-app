import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const LANGUAGE_STORAGE_KEY = 'currentLanguage';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translateService: TranslateService) {
    // Retrieve the language from local storage or set a default language
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const defaultLanguage = 'en';
    const languageToSet = savedLanguage || defaultLanguage;
    this.setLanguage(languageToSet);
  }

  setLanguage(lang: string): void {
    this.translateService.use(lang);

    // Set layout direction based on the selected language
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }

    // Store the language in local storage
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  }
}
