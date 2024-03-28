import { Routes } from '@angular/router';
import { MonkeymonComponent } from './pages/monkeymon/monkeymon.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { MonkeyapiComponent } from './pages/monkeyapi/monkeyapi.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'monkeymon',
    pathMatch: 'prefix',
    title: 'Home',
  },
  {
    path: 'monkeymon',
    component: MonkeymonComponent,
    title: 'MonkeyMon Angular - Home',
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    title: 'MonkeyMon Angular - Statistics',
  },
  {
    path: 'monkeyapi',
    component: MonkeyapiComponent,
    title: 'MonkeyMon Angular - MonkeyAPI',
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    title: 'MonkeyMon Angular - MonkeyMon Portfolio',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'MonkeyMon Angular - Settings',
  },
];
