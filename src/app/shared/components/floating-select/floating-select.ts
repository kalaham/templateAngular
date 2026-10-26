import { Component, contentChild } from '@angular/core';
import { BrnSelect } from '@spartan-ng/brain/select';
import { HlmField } from '@spartan-ng/helm/field';
import { HlmSelect } from '@spartan-ng/helm/select';
import { classes } from '@spartan-ng/helm/utils';

@Component({
  selector: 'app-floating-select',
  hostDirectives: [HlmField],
  template: `<ng-content />`,
})
export class FloatingSelect {
  private readonly select = contentChild(HlmSelect, { read: BrnSelect });

  constructor() {
    classes(() => [
      'relative pt-5',
      '*:data-[slot=field-label]:absolute *:data-[slot=field-label]:left-2.5 *:data-[slot=field-label]:z-10 *:data-[slot=field-label]:flex *:data-[slot=field-label]:items-center *:data-[slot=field-label]:transition-all *:data-[slot=field-label]:duration-150',
      'data-[matches-spartan-invalid=true]:*:data-[slot=field-label]:text-destructive',
      this.select()?.hasValue()
        ? '*:data-[slot=field-label]:top-0 *:data-[slot=field-label]:h-5 *:data-[slot=field-label]:text-xs *:data-[slot=field-label]:text-foreground'
        : '*:data-[slot=field-label]:top-5 *:data-[slot=field-label]:h-8 *:data-[slot=field-label]:text-muted-foreground',
    ]);
  }
}
