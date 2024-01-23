import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FormControlPresenterComponent, StepFormValue, WorkflowForm } from '@te44-front/shared';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { WorkflowStateActions } from '../../../../state/actions/workflow.actions';
import { AddStepFormComponent } from '../add-step-form/add-step-form.component';

@Component({
  selector: 'app-admin-new-workflow',
  standalone: true,
  imports: [CommonModule, StepsModule, FormControlPresenterComponent, ButtonModule, FormControlPresenterComponent, ReactiveFormsModule, InputTextModule, AddStepFormComponent],
  templateUrl: './admin-new-workflow.component.html',
  styleUrl: './admin-new-workflow.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AdminNewWorkflowComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: AdminNewWorkflowComponent },
  ],
})
export class AdminNewWorkflowComponent {

  workflowForm: FormGroup<WorkflowForm> = this.formBuilder.group<WorkflowForm>({
    libelle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    etapes: new FormArray<FormControl<StepFormValue>>([new FormControl<StepFormValue>({
      libelle: '',
      description: '',
      statut: '',
      sousEtapes: []
    }, { nonNullable: true })]),
  });

  items: MenuItem[] = [
    {
      label: $localize`:@@WORKFLOW_INFO:Informations workflow`,
    },
    {
      label: $localize`:@@STEPS_AND_SUBSTEPS:Étapes et sous-étapes`,
    }
  ];

  activeIndex: number = 0;

  constructor(private formBuilder: FormBuilder, private store: Store, private router: Router) { }

  get etapes() {
    return this.workflowForm.controls.etapes;
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  nextStep(): void {
    ++this.activeIndex;
  }

  previousStep(): void {
    --this.activeIndex;
  }

  createWorkflow(): void {
    this.store.dispatch(new WorkflowStateActions.Create(this.workflowForm.getRawValue()));
    this.router.navigateByUrl('/administration/workflow');
  }

  onRemoveStep(i: number): void {
    this.etapes?.removeAt(i);
  }

  onAddStep(): void {
    this.etapes?.push(new FormControl<StepFormValue>({ libelle: '', description: '', statut: '', sousEtapes: [] }, { nonNullable: true }));
  }

}
