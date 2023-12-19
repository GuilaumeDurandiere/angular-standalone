import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';

@Component({
  selector: 'app-server-paginated-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './server-paginated-table.component.html',
  styleUrl: './server-paginated-table.component.less',
})
export class ServerPaginatedTableComponent implements OnInit, AfterContentInit {
  @ViewChild(Table) table: Table | undefined;
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

  @Output() loadPageData: EventEmitter<TableLazyLoadEvent> = new EventEmitter();

  @Input() paginationData: unknown | null;
  @Input() columns: string[] = [];

  bodyTemplate: TemplateRef<unknown> | undefined = undefined;
  captionTemplate: TemplateRef<unknown> | undefined = undefined;

  tableItems: unknown[] = [];

  @Input() autoLayout = false;
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

  ngOnInit(): void {
    // Inform the parent component that we need to display the first page
    this.loadPagedData({ first: this.first, rows: this.rows, sortField: this.sortField, sortOrder: this.sortOrder });
  }

  ngAfterContentInit(): void {
    // Try to retrieve the body template
    const primeNgTemplateBody = this.getPrimeTemplatebyType('body');
    if (primeNgTemplateBody) {
      this.bodyTemplate = primeNgTemplateBody.template;
    }

    // Try to retrieve the caption template
    const primeNgTemplateCaption = this.getPrimeTemplatebyType('caption');
    if (primeNgTemplateCaption) {
      this.captionTemplate = primeNgTemplateCaption.template;
    }
  }

  getPrimeTemplatebyType(type: string): PrimeTemplate | undefined {
    if (this.templates) {
      return this.templates.find((template: PrimeTemplate) => template.getType() === type);
    }

    return undefined;
  }

  loadPagedData(event: TableLazyLoadEvent): void {
    this.loading = true;

    // Emit an event to notify parent component that a new page should be requested
    this.loadPageData.emit(event);
  }




}
