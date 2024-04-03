import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './views/navbar/navbar.component';
import { FooterComponent } from './views/footer/footer.component';
import { AngularQueryDevtoolsComponent } from './components/angular-query-devtools/angular-query-devtools.component';
import { HlmToasterComponent } from './components/ui-sonner-helm/src/lib/hlm-toaster.component';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    AngularQueryDevtoolsComponent,
    HlmToasterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'monkeymon';

  ngOnInit(): void {
    initFlowbite();
  }
}
