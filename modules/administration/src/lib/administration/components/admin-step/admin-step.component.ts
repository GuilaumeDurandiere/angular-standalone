import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Step, StepHttpService } from '@te44-front/shared';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { WorkflowState } from '../../../../state/workflow.state';
import { AdminStepModalComponent } from '../admin-step-modal/admin-step-modal.component';

@Component({
  selector: 'app-admin-step',
  standalone: true,
  imports: [RouterModule, CommonModule, ButtonModule, TableModule, MessagesModule, AsyncPipe, ConfirmDialogModule],
  templateUrl: './admin-step.component.html',
  styleUrl: './admin-step.component.less',
  providers: [DialogService, ConfirmationService]
})
export class AdminStepComponent implements OnDestroy {
  workflow$ = this.store.select(WorkflowState.getWorkflow);
  ref: DynamicDialogRef | undefined;

  constructor(
    private stepService: StepHttpService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private store: Store) { }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
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
      header: $localize`:@@MODIFY_STEP:Modifier l'étape ${step.libelle}`,
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      maximizable: true,
      data: { workflow$: this.workflow$, step },
      dismissableMask: true,
      closeOnEscape: true
    });
  }

  deleteConfirmation(steps: Step[], step: Step): void {
    this.confirmationService.confirm({
      message: $localize`:@@CONFIRMATION_MESSAGE:Voulez-vous vraiment supprimer cette étape ?`,
      header: $localize`:@@CONFIRMATION_HEADER:Confirmation de suppression`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: $localize`:@@YES:Oui`,
      rejectLabel: $localize`:@@NO:Non`,
      dismissableMask: true,
      accept: () => {
        this.stepService.delete(step.id).subscribe();
        steps = steps.filter((val) => val.id !== step.id);
      }
    });
  }
}
