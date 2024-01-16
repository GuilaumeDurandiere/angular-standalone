import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { BoolToStringPipe, ColumnCustom, DuplicateWorkflowFormValue, PaginationData, PaginationDto, ServerPaginatedTableComponent, Workflow } from '@te44-front/shared';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Observable, filter, take } from 'rxjs';
import { WorkflowStateActions } from '../../../../state/actions/workflow.actions';
import { WorkflowState } from '../../../../state/workflow.state';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalDuplicateWorkflowComponent } from '../modal-duplicate-workflow/modal-duplicate-workflow.component';

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

  loadPageData(event: PaginationData): void {
    this.store.dispatch(new WorkflowStateActions.LoadPageData(event));
  }

  openModalDuplicateWorkflow(id: number, name: string) : void {
    this.ref = this.dialogService.open(ModalDuplicateWorkflowComponent, {
      header: $localize`:@@DUPLICATE_A_WORKFLOW:Dupliquer un Workflow`,
      data: {workflowName: name }
    });
    
      this.ref.onClose
      .pipe(
        take(1),
        filter<DuplicateWorkflowFormValue | null>(Boolean),
      )
      .subscribe((formValue: DuplicateWorkflowFormValue) => {
        this.store.dispatch(new WorkflowStateActions.Duplicate(id, formValue.libelle));
      });
}

}
