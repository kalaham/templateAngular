import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTableImports } from '@spartan-ng/helm/table';

export interface DataTableColumn {
  key: string;
  header: string;
  align?: 'left' | 'right';
}

export interface DataTableRow {
  [key: string]: string | number;
}

@Component({
  selector: 'app-data-table',
  imports: [HlmButtonImports, HlmCardImports, HlmInputImports, HlmTableImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './data-table.html',
})
export class DataTable {
  readonly title = input.required<string>();
  readonly description = input('');
  readonly columns = input.required<DataTableColumn[]>();
  readonly rows = input.required<DataTableRow[]>();
  readonly pageSize = input(5);
  readonly searchPlaceholder = input('Buscar');
  readonly emptyLabel = input('Sin resultados');
  readonly pageLabel = input('Página');
  readonly ofLabel = input('de');

  protected readonly query = signal('');
  protected readonly page = signal(1);

  protected readonly filtered = computed(() => {
    const query = this.query().trim().toLowerCase();
    const rows = this.rows();
    if (!query) return rows;
    return rows.filter((row) =>
      Object.values(row).some((value) => String(value).toLowerCase().includes(query)),
    );
  });

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filtered().length / this.pageSize())),
  );

  protected readonly currentPage = computed(() => Math.min(this.page(), this.totalPages()));

  protected readonly pageRows = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filtered().slice(start, start + this.pageSize());
  });

  protected onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.page.set(1);
  }

  protected previous(): void {
    this.page.set(Math.max(1, this.currentPage() - 1));
  }

  protected next(): void {
    this.page.set(Math.min(this.totalPages(), this.currentPage() + 1));
  }

  protected cell(row: DataTableRow, key: string): string | number {
    return row[key] ?? '';
  }
}
