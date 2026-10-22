import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-server-error',
  imports: [HlmButtonImports, HlmCardImports, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './server-error.html',
})
export class ServerError {
  protected readonly layout = inject(LayoutService);
}
