import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './views/navbar/navbar.component';
import { FooterComponent } from './views/footer/footer.component';
import { HlmToasterComponent } from './components/ui-sonner-helm/src/lib/hlm-toaster.component';
import { initDropdowns } from 'flowbite/lib/esm/components/dropdown';
import { AngularQueryDevtoolsComponent } from './components/angular-query-devtools/angular-query-devtools.component';
import { Component, OnInit, isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    HlmToasterComponent,
    AngularQueryDevtoolsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'monkeymon';
  devMode = isDevMode();

  ngOnInit(): void {
    initDropdowns();
  }
}
