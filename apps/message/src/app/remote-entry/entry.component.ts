import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'nested-mfes-message-entry',
  standalone: true,
  styleUrls: ['./entry.component.scss'],
  template: `    
    <h3>
      MESSAGE COMPONENT (Nested Remote MFE)
    </h3>
    <h2>Message: {{message}}</h2>
    <button (click)="output$.next('HOWDY')">Send Event To Parent</button>
  `,
})
export class RemoteEntryComponent {
  @Input() message = 'Initial Message';

  output$ = new Subject<string>();
}
