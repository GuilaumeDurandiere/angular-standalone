import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { BoolToStringPipe, ColumnCustom, DuplicateWorkflowFormValue, PaginationData, PaginationDto, ServerPaginatedTableComponent, Workflow, WorkflowFormValue } from '@te44-front/shared';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { Observable, filter, take } from 'rxjs';
import { WorkflowStateActions } from '../../../../state/actions/workflow.actions';
import { WorkflowState } from '../../../../state/workflow.state';
import { ModalDuplicateWorkflowComponent } from '../modal-duplicate-workflow/modal-duplicate-workflow.component';
import { ModalUpdateWorkflowComponent } from '../modal-update-workflow/modal-update-workflow.component';

@Component({
  selector: 'app-admin-workflow',
  standalone: true,
  imports: [CommonModule, ButtonModule, ServerPaginatedTableComponent, SharedModule, BoolToStringPipe, RouterModule, ConfirmDialogModule, TooltipModule],
  templateUrl: './admin-workflow.component.html',
  styleUrl: './admin-workflow.component.less',
  providers: [DialogService, ConfirmationService]
})

export class AdminWorkflowComponent implements OnDestroy {
  workflows$: Observable<PaginationDto<Workflow> | null> = this.store.select(WorkflowState.getWorkflows);

  columns: ColumnCustom[] = [
    { field: 'nom', header: $localize`:@@NAME:Nom`, sort: true, style: 'width: 20%;' },
    { field: 'offre', header: $localize`:@@RELATED_OFFERS:Offres liées`, sort: false, style: 'width: 50%;' },
    { field: 'etat', header: $localize`:@@STATE:État`, sort: true, style: 'width: 12%;' },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: false, style: 'width: 18%;' },
  ];

  ref: DynamicDialogRef | undefined;

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private store: Store,
  ) { }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  loadPageData(event: PaginationData): void {
    this.store.dispatch(new WorkflowStateActions.LoadPageData(event));
  }

  openModalDuplicateWorkflow(id: number, name: string): void {
    this.ref = this.dialogService.open(ModalDuplicateWorkflowComponent, {
      header: $localize`:@@DUPLICATE_A_WORKFLOW:Dupliquer un workflow`,
      data: { workflowName: name },
      dismissableMask: true,
      closeOnEscape: true
    });

    this.ref.onClose
      .pipe(
        take(1),
        filter<DuplicateWorkflowFormValue | null>(Boolean),
      )
      .subscribe((formValue: DuplicateWorkflowFormValue) => {
        this.store.dispatch(new WorkflowStateActions.Duplicate(id, formValue.libelle));
        this.messageService.add({ severity: 'success', summary: 'Duplication', detail: `Le workflow ${formValue.libelle} a été créé` })
      });
  }

  showUpdateWorkflowModal(workflow: Workflow): void {
    if (!workflow) {
      return
    }
    this.ref = this.dialogService.open(ModalUpdateWorkflowComponent, {
      header: $localize`:@@MODIFY_WORKFLOW:Modifier ${workflow.libelle}`,
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      data: {
        workflow
      },
      dismissableMask: true,
      closeOnEscape: true
    });

    this.ref.onClose
      .pipe(
        take(1),
        filter<WorkflowFormValue | null>(Boolean),
      )
      .subscribe((formValue: WorkflowFormValue) => {
        this.store.dispatch(new WorkflowStateActions.Update(formValue, workflow.id));
        this.messageService.add({ severity: 'success', summary: 'Modification', detail: `Le workflow ${formValue.libelle} a été modifié` })
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
        this.messageService.add({ severity: 'success', summary: 'Suppression', detail: `Le workflow ${workflow.libelle} a été supprimé` })
      }
    });
  }
}
