import { Component, ComponentRef, OnInit } from '@angular/core';
import { UserService } from '@nested-mfes/shared/data-access-user';
import { Subject, tap } from 'rxjs';

@Component({
  selector: 'nested-mfes-login-entry',
  styleUrls: ['./entry.component.scss'],
  template: `  
  <h2>
    LOGIN (REMOTE MFE)
  </h2>
  <div class="login-app">
    
    <ng-container 
      *ngIf="remoteDefinitions"
      nestedMfesMfeOutlet 
      [remoteDefinitions]="remoteDefinitions"
      remoteModule="./Component"
      remoteName="message"
      [initializationCallback]="initializeMfe"
    ></ng-container>

    <!-- <form class="login-form" (ngSubmit)="login()">
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
    <div *ngIf="isLoggedIn$ | async">User is logged in!</div> -->
  </div>
  `,
})
export class RemoteEntryComponent implements OnInit {

  remoteDefinitions: undefined | Record<string, string>;
  mfeRef: undefined | ComponentRef<unknown>;

  username = '';
  password = '';
  isLoggedIn$ = this.userService.isUserLoggedIn$;

  constructor(private userService: UserService) {}
  
  login() {
    this.userService.checkCredentials(this.username, this.password);
  }

  initializeMfe(ref: ComponentRef<any>) {
    // Demonstrates setting an input of the MFE
    ref.setInput('message', 'Updated Message');
    // Demonstrates listening for events from the MFE
    this.mfeRef = ref;
    (ref.instance.output$ as Subject<string>).pipe(
      tap(console.log)
    ).subscribe();
    // TODO: unsubscribe onDestroy
    // ref.onDestroy
  }

  async ngOnInit () {
    // get the remote definitions so that they can be passed to generated MFE
    // TODO: this may not be needed here and could potentially overwrite existing remote definitions 
    await fetch('/assets/module-federation.manifest.json')
      .then((res) => res.json())
      .then((definitions) => {
        this.remoteDefinitions = definitions
    })
  }
}
