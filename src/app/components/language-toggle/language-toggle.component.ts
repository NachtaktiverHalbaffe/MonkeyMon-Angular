import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [],
  templateUrl: './language-toggle.component.html',
})
export class LanguageToggleComponent {
  constructor(private translate: TranslateService) {}

  useLanguage(language: 'de' | 'en'): void {
    this.translate.use(language);
  }
}
