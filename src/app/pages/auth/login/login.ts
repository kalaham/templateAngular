import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { APP_SETTINGS } from '../../../core/config/app-settings';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'app-login',
  imports: [HlmButtonImports, HlmCardImports, HlmFieldImports, HlmInputImports, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
})
export class Login {
  protected readonly layout = inject(LayoutService);
  protected readonly settings = APP_SETTINGS;
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  protected readonly submitted = signal(false);

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;
    void this.router.navigate(['/starter']);
  }
}
