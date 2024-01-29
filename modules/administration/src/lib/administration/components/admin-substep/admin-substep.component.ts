import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { ClientPaginatedTableComponent, ColumnCustom, Step, Substep, SubstepFormValue } from '@te44-front/shared';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { combineLatest, filter, take } from 'rxjs';
import { WorkflowStateActions } from '../../../../state/actions/workflow.actions';
import { WorkflowState } from '../../../../state/workflow.state';
import { ModalUpsertSubstepComponent } from '../modal-upsert-substep/modal-upsert-substep.component';

@Component({
  selector: 'app-admin-substep',
  standalone: true,
  imports: [RouterModule, CommonModule, ButtonModule, AsyncPipe, ConfirmDialogModule, ClientPaginatedTableComponent, TooltipModule],
  templateUrl: './admin-substep.component.html',
  styleUrl: './admin-substep.component.less',
  providers: [DialogService, ConfirmationService]
})
export class AdminSubstepComponent implements OnDestroy {
  viewModel$ = combineLatest({ 
    step: this.store.select(WorkflowState.getStep), 
    workflow: this.store.select(WorkflowState.getWorkflow) 
  });
  dialog: DynamicDialogRef | undefined;
  columns: ColumnCustom[] = [
    { field: 'libelle', header: $localize`:@@NAME:Nom`, sort: true, style: 'width: 25%;' },
    { field: 'description', header: $localize`:@@DESCRIPTION:Description`, sort: true, style: 'width: 63%;' },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: false, style: 'width: 12%;' },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private store: Store,
    private messageService: MessageService) { }

  ngOnDestroy(): void {
    if (this.dialog) {
      this.dialog.close();
    }
  }

  showAddSubstepModal(step: Step | null): void {
    if (!step) {
      return;
    }
    this.dialog = this.dialogService.open(ModalUpsertSubstepComponent, {
      header: $localize`:@@ADD_SUBSTEP_AT:Ajouter une sous-étape à ${step.libelle}`,
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      maximizable: true,
      dismissableMask: true,
      closeOnEscape: true,
    });
    this.dialog.onClose
      .pipe(
        take(1),
        filter<SubstepFormValue | null>(Boolean),
      )
      .subscribe((formValue: SubstepFormValue) => {
        this.store.dispatch(new WorkflowStateActions.CreateSubstep(formValue, step.id));
        this.messageService.add({ severity: 'success', summary: 'Ajout', detail: `La sous-étape ${formValue.libelle} a été créée` });
      });
  }

  showUpdateSubstepModal(substep: Substep): void {
    if (!substep) {
      return;
    }

    this.dialog = this.dialogService.open(ModalUpsertSubstepComponent, {
      header: $localize`:@@MODIFY_STEP:Modifier ${substep.libelle}`,
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      maximizable: true,
      dismissableMask: true,
      closeOnEscape: true,
      data: {
        substep
      }
    });

    this.dialog.onClose
      .pipe(
        take(1),
        filter<SubstepFormValue | null>(Boolean),
      )
      .subscribe((formValue: SubstepFormValue) => {
        this.store.dispatch(new WorkflowStateActions.UpdateSubstep(formValue, substep.id));
        this.messageService.add({ severity: 'success', summary: 'Modification', detail: `La sous-étape ${formValue.libelle} a été modifiée` });
      });
  }

  deleteConfirmation(substep: Substep): void {
    this.confirmationService.confirm({
      message: $localize`:@@CONFIRMATION_MESSAGE_SUBSTEP:Voulez-vous vraiment supprimer cette sous-étape ?`,
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
        this.store.dispatch(new WorkflowStateActions.DeleteSubstep(substep.id));
        this.messageService.add({ severity: 'success', summary: 'Suppression', detail: `La sous-étape ${substep.libelle} a été supprimée` });
      }
    });
  }
}
