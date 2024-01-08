import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BoolToStringPipe, ColumnCustom, PaginationData, ServerPaginatedTableComponent, Workflow, WorkflowHttpService } from '@te44-front/shared';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-workflow',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, ServerPaginatedTableComponent, SharedModule, BoolToStringPipe],
  templateUrl: './admin-workflow.component.html',
  styleUrl: './admin-workflow.component.less',
})
export class AdminWorkflowComponent {
  workflows$: Observable<Workflow[]> = this.workflowService.getAll(1, 15).pipe(map(data => data.results));

  columns: ColumnCustom[] = [
    { field: 'name', header: $localize`:@@NAME:Nom`, sort: true, style: 'width: 20%;' },
    { field: 'offer', header: $localize`:@@RELATED_OFFERS:Offres liées`, sort: true, style: 'width: 50%;' },
    { field: 'active', header: $localize`:@@ACTIVE:Actif`, sort: true, style: 'width: 15%;' },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: true, style: 'width: 15%;' },
  ];

  constructor(private router: Router, private workflowService: WorkflowHttpService){}

  selectRow(id: number): void {
    this.router.navigate([`/administration/workflow/${id}`]);
  }

  loadPageData(event: PaginationData): void {
    console.log(event)
  }
}
