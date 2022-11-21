import { Directive } from '@angular/core';

@Directive({
  selector: '[nestedMfesMfeOutlet]',
  standalone: true
})
export class MfeOutletDirective {

  constructor() {
    console.log('DIRECTIVE')
  }

}
