import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ColumnCustom } from '../../../models/ColumnCustom';
import { PaginationData } from '../../../models/PaginationData';
import { PaginationDto } from '../../../models/PaginationDto';

@Component({
  selector: 'app-server-paginated-table',
  standalone: true,
  imports: [CommonModule, TableModule, SharedModule],
  templateUrl: './server-paginated-table.component.html',
  styleUrl: './server-paginated-table.component.less',
})
export class ServerPaginatedTableComponent implements OnInit, OnChanges, AfterContentInit {
  @ViewChild(Table) table!: Table;
  @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

  @Output() loadPageData: EventEmitter<PaginationData> = new EventEmitter();

  @Input() paginationData: PaginationDto<unknown> | null = null;
  @Input() columns: ColumnCustom[] = [];

  bodyTemplate: TemplateRef<unknown> | undefined = undefined;
  captionTemplate: TemplateRef<unknown> | undefined = undefined;

  tableItems: unknown[] = [];

  @Input() autoLayout = false;
  @Input() loading = false;
  @Input() first = 1;
  @Input() paginator = true;
  @Input() rowHover = true;
  @Input() rows = 15;
  @Input() rowsPerPageOptions = [5, 10, 20, 30, 50];
  @Input() sortField = '';
  @Input() sortOrder = 1;
  @Input() totalRecords = 0;
  @Input() resizeCol = false;

  constructor() { }

  ngOnInit(): void {
    // Inform the parent component that we need to display the first page
    this.loadPagedData({ first: this.first, rows: this.rows, sortField: this.sortField, sortOrder: this.sortOrder });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Set table properties when data is available
    if (changes['paginationData']?.currentValue) {
      this.setTablePropertiesByPaginationDto(this.paginationData);
    }
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

  sortColumn(event: Event): void {
    event.preventDefault();
  }

  loadPagedData(event: TableLazyLoadEvent): void {
    this.loading = true;

    // Start manage offset/page
    let page = 1;
    if (event.first && event.rows) {
      page = (event.first / event.rows) + 1;
    }
    // End manage offset/page


    // Emit an event to notify parent component that a new page should be requested
    this.loadPageData.emit({ pageIndex: page, pageSize: event.rows ?? 15 });
  }

  /**
   * Returns a sort descriptor as needed by the backend
   * @param sortField on which the sort is active (can be null)
   * @param sortOrder of the sortField
   * @returns an empty string of no sortField is specified or a string formmated as sortField;sortOrder
   */
  getSortDescriptor(sortField: string | undefined, sortOrder: number | undefined): string | null {
    const isAscendingSort = sortOrder === 1;
    const sort = isAscendingSort ? 'asc' : 'desc';

    return sortField ? `${sortField};${sort}` : null;
  }

  /**
   * Sets the table options by extracting value from a PaginationDto<any>
   * @param data to analyse
   */
  setTablePropertiesByPaginationDto(paginationDto: PaginationDto<unknown> | null): void {
    if (paginationDto) {

      // Start manage offset/page 
      const page = paginationDto.pageIndex - 1;
      const size = paginationDto.pageSize;

      let first = 0;
      if (page && size) {
        first = page * size;
      }
      // End manage offset/page 


      this.first = first
      this.rows = size;
      this.tableItems = paginationDto.results ?? [];
      this.totalRecords = paginationDto.total;

      this.loading = false;
    }
  }
}
