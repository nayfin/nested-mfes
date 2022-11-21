import { AfterViewInit, ComponentRef, Directive, Input, ViewContainerRef } from '@angular/core';
import { loadRemoteModule, setRemoteDefinitions } from '@nrwl/angular/mf';

@Directive({
  selector: '[nestedMfesMfeOutlet]',
  standalone: true
})
export class MfeOutletDirective implements AfterViewInit {

  @Input() remoteDefinitions!: Record<string, string>;
  @Input() remoteName!: string;
  @Input() remoteModule!: string;
  @Input() initializationCallback: undefined | ((ref: ComponentRef<unknown>) => void)

  constructor(
    private vcr: ViewContainerRef
  ) { }

  async ngAfterViewInit() {
    setRemoteDefinitions(this.remoteDefinitions);
    const m = await loadRemoteModule(this.remoteName, this.remoteModule);
    const ref = this.vcr.createComponent(m.RemoteEntryComponent);

    if (this.initializationCallback) this.initializationCallback(ref);
  }
}
