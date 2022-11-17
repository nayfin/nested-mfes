import { setRemoteDefinitions } from '@nrwl/angular/mf';

// NOTE: this doesn't do anything when the app is served as an MFE, since
// the wrapper app is never bootstapped
fetch('/assets/module-federation.manifest.json')
  .then((res) => res.json())
  .then((definitions) => {
    console.log({definitions})
    return setRemoteDefinitions(definitions)
  })
  .then(() => import('./bootstrap').catch((err) => console.error(err)));