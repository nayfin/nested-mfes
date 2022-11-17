import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { remoteRoutes } from './entry.routes';
import { setRemoteDefinitions } from '@nrwl/angular/mf';
// import { setRemoteDefinitions } from '@nrwl/angular/mf';

console.log('Entry Module')

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(remoteRoutes),
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: async () => await fetch('/assets/module-federation.manifest.json')
    //     .then((res) => res.json())
    //     .then((definitions) => {
    //     console.log({definitions})
    //     return setRemoteDefinitions(definitions)
    //   }),
    //   multi: true
    // }
  ],
})
export class RemoteEntryModule { }
