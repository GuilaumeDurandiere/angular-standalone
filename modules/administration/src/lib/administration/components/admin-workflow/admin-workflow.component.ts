import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { BoolToStringPipe, ColumnCustom, PaginationData, PaginationDto, ServerPaginatedTableComponent, Workflow } from '@te44-front/shared';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { WorkflowStateActions } from '../../../../state/actions/workflow.actions';
import { WorkflowState } from '../../../../state/workflow.state';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalDuplicateWorkflow } from '../modal-duplicate-workflow/modal-duplicate-workflow.component';

@Component({
  selector: 'app-admin-workflow',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, ServerPaginatedTableComponent, SharedModule, BoolToStringPipe, RouterModule],
  templateUrl: './admin-workflow.component.html',
  styleUrl: './admin-workflow.component.less',
})

export class AdminWorkflowComponent {
  workflows$: Observable<PaginationDto<Workflow> | null> = this.store.select(WorkflowState.getWorkflows);

  columns: ColumnCustom[] = [
    { field: 'name', header: $localize`:@@NAME:Nom`, sort: true, style: 'width: 20%;' },
    { field: 'offer', header: $localize`:@@RELATED_OFFERS:Offres liées`, sort: true, style: 'width: 50%;' },
    { field: 'active', header: $localize`:@@ACTIVE:Actif`, sort: true, style: 'width: 15%;' },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: true, style: 'width: 15%;' },
  ];

  ref: DynamicDialogRef | undefined;

  constructor(private router: Router, private store: Store, public dialogService: DialogService) { }
  selectRow(id: number): void {
    this.router.navigate([`/administration/workflow/${id}`]);
  }

  loadPageData(event: PaginationData): void {
    this.store.dispatch(new WorkflowStateActions.LoadPageData(event));
  }

  show(id: number, name: string) {
    this.ref = this.dialogService.open(ModalDuplicateWorkflow, {data: { workflowId: id, workflowName: name }});
}

}
