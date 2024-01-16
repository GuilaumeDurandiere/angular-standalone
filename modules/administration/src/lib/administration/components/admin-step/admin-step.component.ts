import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { ClientPaginatedTableComponent, ColumnCustom, Step } from '@te44-front/shared';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { WorkflowState } from '../../../../state/workflow.state';
import { AdminStepModalComponent } from '../admin-step-modal/admin-step-modal.component';
import { WorkflowStateActions } from '../../../../state/actions/workflow.actions';

@Component({
  selector: 'app-admin-step',
  standalone: true,
  imports: [RouterModule, CommonModule, ButtonModule, TableModule, MessagesModule, AsyncPipe, ConfirmDialogModule, ClientPaginatedTableComponent],
  templateUrl: './admin-step.component.html',
  styleUrl: './admin-step.component.less',
  providers: [DialogService, ConfirmationService]
})
export class AdminStepComponent implements OnDestroy {
  workflow$ = this.store.select(WorkflowState.getWorkflow);
  ref: DynamicDialogRef | undefined;
  columns: ColumnCustom[] = [
    { field: 'libelle', header: $localize`:@@NAME:Nom`, sort: true, style: 'width: 20%;' },
    { field: 'description', header: $localize`:@@DESCRIPTION:Description`, sort: true },
    { field: 'statut', header: $localize`:@@STEP_STATUS:Statut de l'étape`, sort: true },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: false, style: 'width: 14%;' },
  ];

  constructor(
    private router: Router, 
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private store: Store) { }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  selectRow(workflowId: number, stepId: number): void {
    this.router.navigate([`/administration/workflow/${workflowId}/etape/${stepId}`]);
  }

  showAddStepModal(workflowName: string): void {
    this.ref = this.dialogService.open(AdminStepModalComponent, {
      header: $localize`:@@ADD_STEP_AT:Ajouter une étape à ${workflowName}`,
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      maximizable: true,
      data: { workflow$: this.workflow$ },
      dismissableMask: true,
      closeOnEscape: true
    });
  }

  showUpdateStepModal(step: Step): void {
    this.ref = this.dialogService.open(AdminStepModalComponent, {
        header: $localize`:@@MODIFY_STEP:Modifier ${step.libelle}`,
        width: '50vw',
        contentStyle: { overflow: 'auto' },
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
        maximizable: true,
        data: {workflow$: this.workflow$, step},
        dismissableMask: true,
        closeOnEscape: true
    });
  }

  deleteConfirmation(step: Step): void {
    this.confirmationService.confirm({
      message: $localize`:@@CONFIRMATION_MESSAGE_STEP:Voulez-vous vraiment supprimer cette étape ?`,
      header: $localize`:@@CONFIRMATION_HEADER:Confirmation de suppression`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: $localize`:@@YES:Oui`,
      rejectLabel: $localize`:@@NO:Non`,
      dismissableMask: true,
      accept: () => {
        this.store.dispatch(new WorkflowStateActions.DeleteStep(step.id));
      }
    });
  }
}
