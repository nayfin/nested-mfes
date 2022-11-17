import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { UserService } from '@nested-mfes/shared/data-access-user';
import { loadRemoteModule } from '@nrwl/angular/mf';
import { setRemoteDefinitions } from '@nrwl/angular/mf';

@Component({
  selector: 'nested-mfes-login-entry',
  template: `  
  LOGIN REMOTE
  <div class="login-app">
    <div #mfeOutlet></div>

    <form class="login-form" (ngSubmit)="login()">
      <label>
        Username:
        <input type="text" name="username" [(ngModel)]="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" [(ngModel)]="password" />
      </label>
      <button type="submit">Login</button>
    </form>
    <div *ngIf="isLoggedIn$ | async">User is logged in!</div>
  </div>
  `,
})
export class RemoteEntryComponent implements AfterViewInit{

  @ViewChild('mfeOutlet', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  username = '';
  password = '';
  isLoggedIn$ = this.userService.isUserLoggedIn$;
  constructor(private userService: UserService) {}
  login() {
    this.userService.checkCredentials(this.username, this.password);
  }

  async ngAfterViewInit() {
    // TODO: this needs to happen somewhere else
    await fetch('/assets/module-federation.manifest.json')
      .then((res) => res.json())
      .then((definitions) => {
        console.log({definitions})
        return setRemoteDefinitions(definitions)
    })
    const m = await loadRemoteModule('message', './Component');
    const ref = this.viewContainer.createComponent(m.RemoteEntryComponent);
    // Set's input value on component
    ref.setInput('message', 'Howdy');
  }
}
