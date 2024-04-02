import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  QueryClient,
  provideAngularQuery,
} from '@tanstack/angular-query-experimental';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAngularQuery(new QueryClient())],
};
