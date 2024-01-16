import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { ClientPaginatedTableComponent, ColumnCustom, Substep } from '@te44-front/shared';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WorkflowState } from '../../../../state/workflow.state';
import { AdminSubstepModalComponent } from '../admin-substep-modal/admin-substep-modal.component';
import { WorkflowStateActions } from '../../../../state/actions/workflow.actions';

@Component({
  selector: 'app-admin-substep',
  standalone: true,
  imports: [RouterModule, CommonModule, ButtonModule, AsyncPipe, ConfirmDialogModule, ClientPaginatedTableComponent],
  templateUrl: './admin-substep.component.html',
  styleUrl: './admin-substep.component.less',
  providers: [DialogService, ConfirmationService]
})
export class AdminSubstepComponent implements OnDestroy {
  step$ = this.store.select(WorkflowState.getStep);
  workflow$ = this.store.select(WorkflowState.getWorkflow);
  ref: DynamicDialogRef | undefined;
  columns: ColumnCustom[] = [
    { field: 'libelle', header: $localize`:@@NAME:Nom`, sort: true, style: 'width: 25%;' },
    { field: 'description', header: $localize`:@@DESCRIPTION:Description`, sort: true, style: 'width: 63%;' },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: false, style: 'width: 12%;' },
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

  showAddSubstepModal(stepName: string): void {
    this.ref = this.dialogService.open(AdminSubstepModalComponent, {
      header: $localize`:@@ADD_SUBSTEP_AT:Ajouter une sous-étape à ${stepName}`,
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      maximizable: true,
      data: { step$: this.step$ },
      dismissableMask: true,
      closeOnEscape: true
    });
  }

  showUpdateSubstepModal(substep: Substep): void {
    this.ref = this.dialogService.open(AdminSubstepModalComponent, {
        header: $localize`:@@MODIFY_STEP:Modifier ${substep.libelle}`,
        width: '50vw',
        contentStyle: { overflow: 'auto' },
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
        maximizable: true,
        data: {step$: this.step$, substep},
        dismissableMask: true,
        closeOnEscape: true
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
      }
    });
  }
}
