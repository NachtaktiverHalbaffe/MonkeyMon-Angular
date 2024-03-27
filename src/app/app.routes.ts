import { Routes } from '@angular/router';
import { MonkeymonComponent } from './pages/monkeymon/monkeymon.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { MonkeyapiComponent } from './pages/monkeyapi/monkeyapi.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: MonkeymonComponent,
    title: 'Home',
  },
  {
    path: 'monkeymon',
    component: MonkeymonComponent,
    title: 'MonkeyMon',
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    title: 'Statistics',
  },
  {
    path: 'monkeyapi',
    component: MonkeyapiComponent,
    title: 'MonkeyAPI',
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    title: 'MonkeyMon Portfolio',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Settings',
  },
];
