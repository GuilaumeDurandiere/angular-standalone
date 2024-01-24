import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FormControlPresenterComponent, StepFormValue, SubstepFormValue, WorkflowForm, WorkflowFormValue } from '@te44-front/shared';
import { WorkflowStateActions } from 'modules/administration/src/state/actions/workflow.actions';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { Observable, map, startWith } from 'rxjs';
import { AddStepFormComponent } from '../add-step-form/add-step-form.component';

@Component({
  selector: 'app-admin-new-workflow',
  standalone: true,
  imports: [CommonModule, StepsModule, FormControlPresenterComponent, ButtonModule, FormControlPresenterComponent, ReactiveFormsModule, InputTextModule, AddStepFormComponent],
  templateUrl: './admin-new-workflow.component.html',
  styleUrl: './admin-new-workflow.component.less',
})
export class AdminNewWorkflowComponent {
  formGroup: FormGroup<WorkflowForm> = this.formBuilder.nonNullable.group<WorkflowForm>({
    libelle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    etapes: new FormArray<FormControl<StepFormValue>>([new FormControl<StepFormValue>({ libelle: '', description: '', statut: '', sousEtapes: [] }, { nonNullable: true })])
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

  disabled$: Observable<boolean> = this.formGroup.statusChanges.pipe(
    startWith('INVALID'),
    map((status: string) => status !== 'VALID')
  );

  constructor(private formBuilder: FormBuilder, private store: Store, private router: Router) { }

  get etapes() {
    return this.formGroup.controls.etapes;
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
    const formValue = this.formGroup.getRawValue();
    const result: WorkflowFormValue = {
      ...formValue,
      etapes: formValue.etapes.map((etape: StepFormValue) => ({
        ...etape,
        sousEtapes: etape.sousEtapes.filter((subStep: SubstepFormValue) => subStep.libelle !== '')
      }))
    }
    this.store.dispatch(new WorkflowStateActions.Create(result));
    this.router.navigateByUrl('/administration/workflow');
  }

  onRemoveStep(i: number): void {
    this.etapes?.removeAt(i);
  }

  onAddStep(): void {
    this.etapes?.push(new FormControl<StepFormValue>({ libelle: '', description: '', statut: '', sousEtapes: [] }, { nonNullable: true }));
  }
}
