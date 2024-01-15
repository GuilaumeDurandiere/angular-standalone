import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { ColumnCustom } from '../../../models/ColumnCustom';


import { PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule, TablePageEvent } from 'primeng/table';

@Component({
  standalone: true,
  selector: 'app-client-paginated-table',
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './client-paginated-table.component.html',
  styleUrls: ['./client-paginated-table.component.less'],
})
export class ClientPaginatedTableComponent implements AfterContentInit {
  @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

  @ViewChild(Table) table: Table | null = null;

  @Input() data: unknown[] = [];
  @Input() columns: ColumnCustom[] = [];

  bodyTemplate: TemplateRef<unknown> | undefined = undefined;
  captionTemplate: TemplateRef<unknown> | undefined = undefined;
  summaryTemplate: TemplateRef<unknown> | undefined = undefined;

  @Input() displayCaption = true;
  @Input() displaySummary = true;
  @Input() resizeCol = false;
  @Input() loading = false;
  @Input() first = 0;
  @Input() paginator = true;
  @Input() rowHover = true;
  @Input() rows = 5;
  @Input() rowsPerPageOptions = [5, 10, 20, 30, 50];
  @Input() sortField = '';
  @Input() sortOrder = 1;
  @Input() totalRecords = 0;

  constructor() { }

  ngAfterContentInit(): void {
    // Try to retrieve the body template
    const primeNgTemplateBody = this.getPrimeTemplateByType('body');
    if (primeNgTemplateBody) {
      this.bodyTemplate = primeNgTemplateBody.template;
    }

    // Try to retrieve the caption template
    const primeNgTemplateCaption = this.getPrimeTemplateByType('caption');
    if (primeNgTemplateCaption) {
      this.captionTemplate = primeNgTemplateCaption.template;
    }

    // Try to retrieve the summary template
    const primeNgTemplateSummary = this.getPrimeTemplateByType('summary');
    if (primeNgTemplateSummary) {
      this.summaryTemplate = primeNgTemplateSummary.template;
    }
  }

  getPrimeTemplateByType(type: string): PrimeTemplate | undefined {
    if (this.templates) {
      return this.templates.find((template: PrimeTemplate) => template.getType() === type);
    }

    return undefined;
  }

  sortColumn(event: Event): void {
    event.preventDefault();
  }

  setFirst(event: TablePageEvent): void {
    this.first = event.first;
  }
}
