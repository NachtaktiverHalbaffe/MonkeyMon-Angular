import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-query-devtools',
  standalone: true,
  imports: [AngularQueryDevtools],
  template: `
    <angular-query-devtools
      [initialIsOpen]="false"
      buttonPosition="bottom-right"
      position="bottom"
    />
  `,
})
export class AngularQueryDevtoolsComponent {}
