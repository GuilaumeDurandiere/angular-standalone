import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { FormControlPresenterComponent, Step, StepFormValue, SubstepFormValue, WorkflowForm } from '@te44-front/shared';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { Observable, map } from 'rxjs';
import { WorkflowStateActions } from '../../../../state/actions/workflow.actions';
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
    map((status: string) => status !== 'VALID')
  );

  constructor(private formBuilder: FormBuilder, private store: Store, private router: Router) {}

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
    if (this.formGroup.invalid || this.formGroup.value.etapes[0].libelle === '' || this.formGroup.value.etapes[0].statut === '') {
      console.error('error');
    } else {
      this.formGroup.value.etapes = this.formGroup.value.etapes?.filter((x: StepFormValue) => x.libelle !== '');
      this.formGroup.value.etapes.map((etape: Step, index: number) => {
        this.formGroup.value.etapes[index].sousEtapes = this.formGroup.value.etapes[index].sousEtapes.filter((x: SubstepFormValue) => x.libelle !== '')
      })
      this.store.dispatch(new WorkflowStateActions.Create(this.formGroup.getRawValue()));
      this.router.navigateByUrl('/administration/workflow');
    }
  }

  onRemoveStep(i: number): void {
    this.etapes?.removeAt(i);
  }

  onAddStep(): void {
    this.etapes?.push(new FormControl<StepFormValue>({ libelle: '', description: '', statut: '', sousEtapes: [] }, { nonNullable: true }));
  }
}
