import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-not-found',
  imports: [HlmButtonImports, HlmCardImports, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found.html',
})
export class NotFound {
  protected readonly layout = inject(LayoutService);
}
