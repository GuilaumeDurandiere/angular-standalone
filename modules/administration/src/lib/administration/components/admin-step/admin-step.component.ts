import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Step, StepHttpService, Workflow } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { Observable, map, of } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminStepModalComponent } from '../admin-step-modal/admin-step-modal.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-step',
  standalone: true,
  imports: [RouterModule, CommonModule, ButtonModule, TableModule, MessagesModule, AsyncPipe, ConfirmDialogModule],
  templateUrl: './admin-step.component.html',
  styleUrl: './admin-step.component.less',
  providers: [DialogService, ConfirmationService]
})
export class AdminStepComponent implements OnInit, OnDestroy {
  workflow$: Observable<Workflow | null> = of(null);
  ref: DynamicDialogRef | undefined;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  constructor(private stepService: StepHttpService, private confirmationService: ConfirmationService, public dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {
    this.workflow$ = this.route.data.pipe(map(({ workflow }) => workflow));
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
        data: {workflow$: this.workflow$},
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
        data: {workflow$: this.workflow$, step},
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

  ngOnDestroy(): void {
    if (this.ref) {
        this.ref.close();
    }
  }
}
