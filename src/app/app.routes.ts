import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'monkeymon',
    pathMatch: 'prefix',
    title: 'Home',
  },
  {
    path: 'monkeymon',
    loadComponent: () =>
      import('./pages/monkeymon/monkeymon.component').then(
        (m) => m.MonkeymonComponent
      ),
    title: 'MonkeyMon Angular - Home',
  },
  {
    path: 'statistics',
    loadComponent: () =>
      import('./pages/statistics/statistics.component').then(
        (m) => m.StatisticsComponent
      ),
    title: 'MonkeyMon Angular - Statistics',
  },
  {
    path: 'monkeyapi',
    loadComponent: () =>
      import('./pages/monkeyapi/monkeyapi.component').then(
        (m) => m.MonkeyapiComponent
      ),
    title: 'MonkeyMon Angular - MonkeyAPI',
  },
  {
    path: 'portfolio',
    loadComponent: () =>
      import('./pages/portfolio/portfolio.component').then(
        (m) => m.PortfolioComponent
      ),
    title: 'MonkeyMon Angular - MonkeyMon Portfolio',
  },
];
