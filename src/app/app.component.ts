import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './views/navbar/navbar.component';
import { FooterComponent } from './views/footer/footer.component';
import { HlmToasterComponent } from './components/ui-sonner-helm/src/lib/hlm-toaster.component';
import { initDropdowns } from 'flowbite/lib/esm/components/dropdown';
import { AngularQueryDevtoolsComponent } from './components/angular-query-devtools/angular-query-devtools.component';
import { Component, OnInit, isDevMode } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    HlmToasterComponent,
    AngularQueryDevtoolsComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'monkeymon';
  devMode = isDevMode();

  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('de');
  }

  ngOnInit(): void {
    initDropdowns();
  }
}
