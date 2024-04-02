import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { Component, isDevMode } from '@angular/core';

@Component({
  selector: 'app-angular-query-devtools',
  standalone: true,
  imports: [AngularQueryDevtools],
  template: `
    @if(isDevMode){
    <angular-query-devtools
      [initialIsOpen]="false"
      buttonPosition="bottom-right"
      position="bottom"
    />
    }
  `,
})
export class AngularQueryDevtoolsComponent {
  isDevMode: boolean = isDevMode();
}
