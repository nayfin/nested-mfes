import { Component, ComponentRef, OnInit } from '@angular/core';
import { UserService } from '@nested-mfes/shared/data-access-user';

@Component({
  selector: 'nested-mfes-login-entry',
  template: `  
  LOGIN REMOTE
  <div class="login-app">
    
    <ng-container 
      *ngIf="remoteDefinitions"
      nestedMfesMfeOutlet 
      [remoteDefinitions]="remoteDefinitions"
      remoteModule="./Component"
      remoteName="message"
      [initializationCallback]="initializeMfe"
    ></ng-container>

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
export class RemoteEntryComponent implements OnInit {

  remoteDefinitions: undefined | Record<string, string>;

  username = '';
  password = '';
  isLoggedIn$ = this.userService.isUserLoggedIn$;
  constructor(private userService: UserService) {}
  login() {
    this.userService.checkCredentials(this.username, this.password);
  }

  initializeMfe(ref: ComponentRef<unknown>) {
    ref.setInput('message', 'Howdy');
  }

  async ngOnInit () {
    // TODO: this shouldn't be needed here and could potentially overwrite existing remote definitions 
    await fetch('/assets/module-federation.manifest.json')
      .then((res) => res.json())
      .then((definitions) => {
        this.remoteDefinitions = definitions
    })
  }
}
