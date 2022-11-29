import { NxWelcomeComponent } from './nx-welcome.component';
import { loadRemoteModule } from '@nrwl/angular/mf';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => loadRemoteModule('login', './Module').then((m) => m.RemoteEntryModule)
  },
  {
    path: 'welcome',
    component: NxWelcomeComponent,
  },
];
