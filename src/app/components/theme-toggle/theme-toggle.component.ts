import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun, lucideSunMoon } from '@ng-icons/lucide';
import { HlmIconComponent } from '../ui-icon-helm/src/lib/hlm-icon.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [HlmIconComponent, TranslateModule],
  providers: [provideIcons({ lucideMoon, lucideSun, lucideSunMoon })],
  templateUrl: './theme-toggle.component.html',
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);

  get currentTheme() {
    return localStorage.getItem('theme') === 'dark'
      ? 'lucideMoon'
      : 'lucideSun';
  }
}
