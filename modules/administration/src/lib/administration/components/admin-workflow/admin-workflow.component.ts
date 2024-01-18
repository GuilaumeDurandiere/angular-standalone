import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { BoolToStringPipe, ColumnCustom, DuplicateWorkflowFormValue, PaginationData, PaginationDto, ServerPaginatedTableComponent, Workflow } from '@te44-front/shared';
import { ConfirmationService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { Observable, filter, take } from 'rxjs';
import { WorkflowStateActions } from '../../../../state/actions/workflow.actions';
import { WorkflowState } from '../../../../state/workflow.state';
import { ModalDuplicateWorkflowComponent } from '../modal-duplicate-workflow/modal-duplicate-workflow.component';

@Component({
  selector: 'app-admin-workflow',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, ServerPaginatedTableComponent, SharedModule, BoolToStringPipe, RouterModule, ConfirmDialogModule],
  templateUrl: './admin-workflow.component.html',
  styleUrl: './admin-workflow.component.less',
  providers: [DialogService, ConfirmationService]
})

export class AdminWorkflowComponent implements OnDestroy {
  workflows$: Observable<PaginationDto<Workflow> | null> = this.store.select(WorkflowState.getWorkflows);

  columns: ColumnCustom[] = [
    { field: 'name', header: $localize`:@@NAME:Nom`, sort: true, style: 'width: 20%;' },
    { field: 'offer', header: $localize`:@@RELATED_OFFERS:Offres liées`, sort: true, style: 'width: 50%;' },
    { field: 'active', header: $localize`:@@ACTIVE:Actif`, sort: true, style: 'width: 12%;' },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: false, style: 'width: 18%;' },
  ];

  ref: DynamicDialogRef | undefined;

  constructor(private router: Router, private store: Store, public dialogService: DialogService, private confirmationService: ConfirmationService) { }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

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

  deleteWorkflow(workflow: Workflow): void {
    this.confirmationService.confirm({
      message: $localize`:@@CONFIRMATION_MESSAGE_WORKFLOW:Voulez-vous vraiment supprimer ce workflow ?`,
      header: $localize`:@@CONFIRMATION_HEADER:Confirmation de suppression`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: $localize`:@@YES:Oui`,
      rejectLabel: $localize`:@@NO:Non`,
      dismissableMask: true,
      closeOnEscape: true,
      accept: () => {
        this.store.dispatch(new WorkflowStateActions.Delete(workflow.id));
      }
    });
  }
}
