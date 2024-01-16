import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControlPresenterComponent, FormGroupPresenterComponent, Step, StepForm, StepHttpService, SubstepForm, SubstepFormValue, Workflow } from '@te44-front/shared';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Observable, of } from 'rxjs';
import { AddSubstepFormComponent } from '../add-substep-form/add-substep-form.component';
import { WorkflowStateActions } from '../../../../state/actions/workflow.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-admin-step-modal',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, ReactiveFormsModule, ButtonModule, AddSubstepFormComponent, FormControlPresenterComponent, FormGroupPresenterComponent],
  templateUrl: './admin-step-modal.component.html',
  styleUrl: './admin-step-modal.component.less',
})
export class AdminStepModalComponent {
  workflow$: Observable<Workflow | null> = of(null);
  step: Step = {id: 0, libelle: '', statut: '', sousEtapes: []};
  stepForm: FormGroup<StepForm> = this.formBuilder.group<StepForm>({
    libelle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string | null>('', { nonNullable: false }),
    statut: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    sousEtapes: new FormArray<FormGroup<SubstepForm>>([this.formBuilder.group<SubstepForm>({
      libelle: new FormControl<string>('', { nonNullable: false }),
      description: new FormControl<string | null>('', { nonNullable: false }),
    })]),
  });

  constructor(private formBuilder: FormBuilder, private stepService: StepHttpService, private ref: DynamicDialogRef, public config: DynamicDialogConfig, private store: Store) {
    this.workflow$ = config.data.workflow$;
    this.subscribeToValueChange();
    if (config.data.step) {
      this.step = config.data.step;
      this.stepForm.patchValue({
        libelle: this.step.libelle,
        description: this.step.description,
        statut: this.step.statut
      });
      this.stepForm.controls.sousEtapes.removeAt(0);
    }
  }

  subscribeToValueChange(): void {
    this.stepForm.valueChanges.subscribe();
  }

  onCreateSubmit(form: FormGroup, workflowId: number): void {
    form.value.sousEtapes = form.value.sousEtapes.filter((x: SubstepFormValue) => x.libelle !== '');
    this.store.dispatch(new WorkflowStateActions.CreateStep({libelle: form.value.libelle, description: form.value.description, statut: form.value.statut, workflowId, sousEtapes: form.value.sousEtapes}, workflowId));
    this.closeDialog();
  }

  onUpdateSubmit(form: FormGroup, workflowId: number): void {
    this.store.dispatch(new WorkflowStateActions.UpdateStep({id: this.step.id, libelle: form.value.libelle, description: form.value.description, statut: form.value.statut, sousEtapes: this.step.sousEtapes, workflowId }));
    this.closeDialog();
  }

  onAddSubstep(): void {
    this.stepForm.controls.sousEtapes.push(new FormControl<SubstepFormValue>({ libelle: '', description: '' }, { nonNullable: true }));
  }

  onRemoveSubstep(i: number): void {
    this.stepForm.controls.sousEtapes.removeAt(i);
  }

  get sousEtapes() {
    return this.stepForm.controls.sousEtapes;
  }

  closeDialog() {
    this.ref.close();
  }
}
