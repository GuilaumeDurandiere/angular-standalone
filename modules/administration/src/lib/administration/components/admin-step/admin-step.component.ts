import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { ClientPaginatedTableComponent, ColumnCustom, Step, StepFormValue, SubstepFormValue, Workflow } from '@te44-front/shared';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';
import { filter, take } from 'rxjs';
import { WorkflowStateActions } from '../../../../state/actions/workflow.actions';
import { WorkflowState } from '../../../../state/workflow.state';
import { ModalUpsertStepComponent } from '../modal-upsert-step/modal-upsert-step.component';

@Component({
  selector: 'app-admin-step',
  standalone: true,
  imports: [RouterModule, CommonModule, ButtonModule, MessagesModule, AsyncPipe, ConfirmDialogModule, ClientPaginatedTableComponent],
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
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: false, style: 'width: 15%;' },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private store: Store) { }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  showAddStepModal(workflow: Workflow | null): void {
    if (!workflow) {
      return
    }
    this.ref = this.dialogService.open(ModalUpsertStepComponent, {
      header: $localize`:@@ADD_STEP_AT:Ajouter une étape à ${workflow.libelle}`,
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      maximizable: true,
      dismissableMask: true,
      closeOnEscape: true
    });

    this.ref.onClose
      .pipe(
        take(1),
        filter<StepFormValue | null>(Boolean),
      )
      .subscribe((formValue: StepFormValue) => {
        formValue.sousEtapes = formValue.sousEtapes?.filter((x: SubstepFormValue) => x.libelle !== '');
        this.store.dispatch(new WorkflowStateActions.CreateStep(formValue, workflow.id));
      });
  }

  showUpdateStepModal(step: Step): void {
    if (!step) {
      return
    }
    this.ref = this.dialogService.open(ModalUpsertStepComponent, {
      header: $localize`:@@MODIFY_STEP:Modifier ${step.libelle}`,
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      maximizable: true,
      data: {
        step
      },
      dismissableMask: true,
      closeOnEscape: true
    });

    this.ref.onClose
      .pipe(
        take(1),
        filter<StepFormValue | null>(Boolean),
      )
      .subscribe((formValue: StepFormValue) => {
        this.store.dispatch(new WorkflowStateActions.UpdateStep(formValue, step.id));
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
      closeOnEscape: true,
      accept: () => {
        this.store.dispatch(new WorkflowStateActions.DeleteStep(step.id));
      }
    });
  }
}
