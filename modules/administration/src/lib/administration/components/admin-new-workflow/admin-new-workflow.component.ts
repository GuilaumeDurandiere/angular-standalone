import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FormControlPresenterComponent, StepForm, StepFormValue, SubstepForm, WorkflowForm, WorkflowFormValue } from '@te44-front/shared';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { Subscription } from 'rxjs';
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
export class AdminNewWorkflowComponent implements ControlValueAccessor, Validator {
  onTouched: Function = () => {};
  onChangeSubs: Subscription[] = [];
  workflowForm: FormGroup<WorkflowForm> = this.formBuilder.group<WorkflowForm>({
    libelle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    etapes: new FormArray<FormGroup<StepForm>>([this.formBuilder.group<StepForm>({
      libelle: new FormControl<string | null>('', { nonNullable: false }),
      description: new FormControl<string | null>('', { nonNullable: false }),
      statut: new FormControl<string | null>('', { nonNullable: false }),
      sousEtapes: new FormArray<FormGroup<SubstepForm>>([this.formBuilder.group<SubstepForm>({
        libelle: new FormControl<string>('', { nonNullable: false }),
        description: new FormControl<string | null>('', { nonNullable: false }),
      })]),
    })]),
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

  constructor(private formBuilder: FormBuilder, private store: Store, private router: Router) {}

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

  createWorkflow(formValue: FormGroup): void {
    formValue.value.etapes = formValue.value.etapes?.filter((x: StepFormValue) => x.libelle !== '');
    this.store.dispatch(new WorkflowStateActions.Create({libelle: formValue.value.libelle, etapes: formValue.value.etapes}));
    this.router.navigateByUrl('/administration/workflow');
  }

  onRemoveStep(i: number): void {
    this.etapes?.removeAt(i);
  }

  onAddStep(): void {
    this.etapes?.push(new FormControl<StepFormValue>({ libelle: '', description: '', statut: '', sousEtapes: [] }, { nonNullable: true }));
  }

  registerOnChange(fn: any): void {
    const sub = this.workflowForm.valueChanges.subscribe(fn);
    this.onChangeSubs.push(sub);
  }

  writeValue(value: WorkflowFormValue): void {
    if (value) {
      this.workflowForm.patchValue({ ...value });
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null;
  }
}
