import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@nested-mfes/shared/data-access-user';
import { distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'nested-mfes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  
  @ViewChild('mfeOutlet', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  isLoggedIn$ = this.userService.isUserLoggedIn$;

  constructor(
    private userService: UserService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        // Queue the navigation after initialNavigation blocking is completed
        setTimeout(() => {
          if (!loggedIn) {
            this.router.navigateByUrl('login');
          } else {
            this.router.navigateByUrl('');
          }
        });
      });
  }

  async ngAfterViewInit() {
    const m = await import('message/Component');
    const ref = this.viewContainer.createComponent(m.RemoteEntryComponent);
  }
}