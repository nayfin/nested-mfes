import { Route } from '@angular/router';
// import { setRemoteDefinitions } from '@nrwl/angular/mf';
import { RemoteEntryComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  { 
    path: '', 
    component: RemoteEntryComponent,
    // TODO: this might work if we make login a standalone component
    // loadComponent: async () => {
    //   await fetch('/assets/module-federation.manifest.json')
    //     .then((res) => res.json())
    //     .then(async (definitions) => {
    //       console.log({definitions})
    //       setRemoteDefinitions(definitions)
    //     });
    //   const comp = await import('./entry.component').then(mod => mod.RemoteEntryComponent)
    //   return comp
    // } 
  },
];
