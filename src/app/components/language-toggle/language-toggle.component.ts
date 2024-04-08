import { Component, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Writeable } from 'zod';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [],
  templateUrl: './language-toggle.component.html',
})
export class LanguageToggleComponent {
  currentLang = signal<string>('');
  constructor(private translate: TranslateService) {
    this.currentLang.set(translate.currentLang);
    console.log(this.currentLang);
  }

  useLanguage(language: 'de' | 'en'): void {
    this.currentLang.set(language);
    this.translate.use(language);
  }
}
