import { Component, contentChild, effect, ElementRef, signal } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { HlmField } from '@spartan-ng/helm/field';
import { HlmInput } from '@spartan-ng/helm/input';
import { classes } from '@spartan-ng/helm/utils';

@Component({
  selector: 'app-floating-field',
  hostDirectives: [HlmField],
  template: `<ng-content />`,
})
export class FloatingField {
  private readonly input = contentChild(HlmInput, { read: ElementRef<HTMLInputElement> });
  private readonly formControl = contentChild(FormControlName);
  private readonly hasValue = signal(false);

  constructor() {
    classes(() => [
      'relative pt-5',
      '*:data-[slot=field-label]:absolute *:data-[slot=field-label]:left-2.5 *:data-[slot=field-label]:z-10 *:data-[slot=field-label]:flex *:data-[slot=field-label]:items-center *:data-[slot=field-label]:transition-all *:data-[slot=field-label]:duration-150',
      'data-[matches-spartan-invalid=true]:*:data-[slot=field-label]:text-destructive',
      this.hasValue()
        ? '*:data-[slot=field-label]:top-0 *:data-[slot=field-label]:h-5 *:data-[slot=field-label]:text-xs *:data-[slot=field-label]:text-foreground'
        : '*:data-[slot=field-label]:top-5 *:data-[slot=field-label]:h-8 *:data-[slot=field-label]:text-muted-foreground',
    ]);

    effect((onCleanup) => {
      const element = this.input()?.nativeElement;
      const control = this.formControl()?.control ?? null;
      if (!element && !control) {
        return;
      }

      const sync = () => {
        const value = control ? control.value : element?.value;
        this.hasValue.set(value != null && `${value}`.length > 0);
      };

      sync();
      const subscription = control?.valueChanges.subscribe(sync);
      const onInput = () => sync();
      element?.addEventListener('input', onInput);
      onCleanup(() => {
        subscription?.unsubscribe();
        element?.removeEventListener('input', onInput);
      });
    });
  }
}
