import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { LanguageToggleComponent } from '../../components/language-toggle/language-toggle.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    ThemeToggleComponent,
    LanguageToggleComponent,
    TranslateModule,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
