import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';

export interface ChartPoint {
  label: string;
  value: number;
}

@Component({
  selector: 'app-chart-card',
  imports: [HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chart-card.html',
})
export class ChartCard {
  readonly title = input.required<string>();
  readonly description = input('');
  readonly points = input.required<ChartPoint[]>();

  protected readonly chart = computed(() => {
    const points = this.points();
    const width = 640;
    const height = 200;
    const padX = 16;
    const padY = 20;
    const max = Math.max(...points.map((point) => point.value), 1);
    const step = points.length > 1 ? (width - padX * 2) / (points.length - 1) : 0;
    const coords = points.map((point, index) => {
      const x = padX + step * index;
      const y = height - padY - (point.value / max) * (height - padY * 2);
      return { ...point, x, y };
    });
    const line = coords.map((point) => `${point.x},${point.y}`).join(' ');
    const area =
      coords.length === 0
        ? ''
        : `M ${coords[0].x} ${height - padY} L ${coords.map((point) => `${point.x} ${point.y}`).join(' L ')} L ${coords[coords.length - 1].x} ${height - padY} Z`;

    return { width, height, coords, line, area, baseline: height - padY };
  });
}
