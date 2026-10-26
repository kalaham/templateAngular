import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmAlertDialogImports } from '@spartan-ng/helm/alert-dialog';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmProgressImports } from '@spartan-ng/helm/progress';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';
import { LayoutService } from '../../core/services/layout.service';
import { DataTable, type DataTableColumn, type DataTableRow } from '../../shared/components/data-table/data-table';
import { FloatingField } from '../../shared/components/floating-field/floating-field';
import { FloatingSelect } from '../../shared/components/floating-select/floating-select';

@Component({
  selector: 'app-ui-components',
  imports: [
    DataTable,
    FloatingField,
    FloatingSelect,
    HlmAlertDialogImports,
    HlmAlertImports,
    HlmBadgeImports,
    HlmButtonImports,
    HlmCardImports,
    HlmFieldImports,
    HlmInputImports,
    HlmProgressImports,
    HlmSelectImports,
    HlmSwitchImports,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-components.html',
})
export class UiComponents {
  protected readonly layout = inject(LayoutService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
  });
  protected readonly role = signal('');
  protected readonly floatingRole = signal('');
  protected readonly alerts = signal(true);
  protected readonly submitted = signal(false);
  protected readonly saved = signal(false);

  protected readonly buttonVariants = ['default', 'outline', 'secondary', 'ghost', 'destructive'] as const;
  protected readonly badgeVariants = ['default', 'secondary', 'outline', 'destructive'] as const;

  protected readonly columns = () =>
    [
      { key: 'name', header: this.layout.t('ui.col.name') },
      { key: 'group', header: this.layout.t('ui.col.group') },
      { key: 'state', header: this.layout.t('ui.col.state') },
    ] satisfies DataTableColumn[];

  protected readonly rows: DataTableRow[] = [
    { name: 'Select', group: 'Form', state: 'Listo' },
    { name: 'Alert', group: 'Feedback', state: 'Listo' },
    { name: 'Table', group: 'Data', state: 'Listo' },
    { name: 'Switch', group: 'Form', state: 'Listo' },
    { name: 'Badge', group: 'Display', state: 'Listo' },
    { name: 'Dialog', group: 'Overlay', state: 'Listo' },
  ];

  protected onRole(value: unknown): void {
    this.role.set(typeof value === 'string' ? value : '');
    this.saved.set(false);
  }

  protected onFloatingRole(value: unknown): void {
    this.floatingRole.set(typeof value === 'string' ? value : '');
  }

  protected save(): void {
    this.submitted.set(true);
    this.saved.set(this.form.valid && this.role().length > 0);
  }
}
