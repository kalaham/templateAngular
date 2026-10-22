import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { LayoutService } from '../../core/services/layout.service';
import { ChartCard, type ChartPoint } from '../../shared/components/chart-card/chart-card';
import { DataTable, type DataTableColumn, type DataTableRow } from '../../shared/components/data-table/data-table';

@Component({
  selector: 'app-starter',
  imports: [ChartCard, DataTable, HlmCardImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './starter.html',
})
export class Starter {
  protected readonly layout = inject(LayoutService);

  protected readonly kpis = computed(() => [
    { label: this.layout.t('starter.kpi.revenue'), value: '$48.2k', delta: '+12.4%' },
    { label: this.layout.t('starter.kpi.orders'), value: '1.284', delta: '+8.1%' },
    { label: this.layout.t('starter.kpi.customers'), value: '326', delta: '+3.4%' },
    { label: this.layout.t('starter.kpi.conversion'), value: '4.8%', delta: '-0.6%' },
  ]);

  protected readonly points = computed<ChartPoint[]>(() => {
    const labels =
      this.layout.language() === 'es'
        ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return [18, 22, 19, 28, 31, 36].map((value, index) => ({ label: labels[index], value }));
  });

  protected readonly columns = computed<DataTableColumn[]>(() => [
    { key: 'order', header: this.layout.t('starter.col.order') },
    { key: 'customer', header: this.layout.t('starter.col.customer') },
    { key: 'status', header: this.layout.t('starter.col.status') },
    { key: 'amount', header: this.layout.t('starter.col.amount'), align: 'right' },
  ]);

  protected readonly rows = computed<DataTableRow[]>(() => [
    { order: 'PED-1042', customer: 'Andes Retail', status: this.layout.t('status.paid'), amount: '$1.280' },
    { order: 'PED-1043', customer: 'Norte Foods', status: this.layout.t('status.pending'), amount: '$860' },
    { order: 'PED-1044', customer: 'Lima Studio', status: this.layout.t('status.paid'), amount: '$2.140' },
    { order: 'PED-1045', customer: 'Pacífico Home', status: this.layout.t('status.refunded'), amount: '$430' },
    { order: 'PED-1046', customer: 'Costa Digital', status: this.layout.t('status.paid'), amount: '$3.010' },
    { order: 'PED-1047', customer: 'Sierra Labs', status: this.layout.t('status.pending'), amount: '$975' },
    { order: 'PED-1048', customer: 'Valle Market', status: this.layout.t('status.paid'), amount: '$1.540' },
  ]);
}
