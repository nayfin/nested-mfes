import { Component, Input } from '@angular/core';

@Component({
  selector: 'nested-mfes-message-entry',
  standalone: true,
  template: `    
    <h1>
      MESSAGE COMPONENT
    </h1>
    <h2>Message: {{message}}</h2>
  `,
})
export class RemoteEntryComponent {
  @Input() message = 'Initial Message';
}
