import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Step, StepForm, StepHttpService, SubstepForm, SubstepFormValue, Workflow } from '@te44-front/shared';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Observable, of } from 'rxjs';
import { AddSubstepFormComponent } from '../add-substep-form/add-substep-form.component';

@Component({
  selector: 'app-admin-step-modal',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, ReactiveFormsModule, ButtonModule, AddSubstepFormComponent],
  templateUrl: './admin-step-modal.component.html',
  styleUrl: './admin-step-modal.component.less',
  providers: [DialogService]
})
export class AdminStepModalComponent {
  workflow$: Observable<Workflow | null> = of(null);
  workflowId: number = 0;
  step: Step = {id: 0, libelle: '', statut: ''};
  stepForm: FormGroup<StepForm> = this.formBuilder.group<StepForm>({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string | null>('', { nonNullable: false }),
    status: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    substeps: new FormArray<FormGroup<SubstepForm>>([this.formBuilder.group<SubstepForm>({
      libelle: new FormControl<string>('', { nonNullable: false }),
      description: new FormControl<string | null>('', { nonNullable: false }),
    })], {  }),
  })

  constructor(private formBuilder: FormBuilder, private stepService: StepHttpService, private dialogService: DialogService, private ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.workflow$ = config.data.workflow$;
    this.workflow$.subscribe(workflow => this.workflowId = workflow?.id ?? 0);
    this.subscribeToValueChange();
    if (config.data.step) {
      this.step = config.data.step;
      this.stepForm.patchValue({
        name: this.step.libelle,
        description: this.step.description,
        status: this.step.statut
      });
      if (this.step.sousetapes && this.step.sousetapes?.length > 0) {
        this.step.sousetapes?.map(substep => 
          this.stepForm.controls.substeps.push(new FormControl<SubstepFormValue>({ libelle: substep.libelle, description: substep.description }, { nonNullable: true })))
      }
    }
  }

  subscribeToValueChange(): void {
    this.stepForm.valueChanges.subscribe();
  }

  // TODO bug closeDIalog, rajouter les substeps dans requetes
  onCreateSubmit(form: FormGroup): void {
    form.value.substeps = form.value.substeps.filter((x: SubstepFormValue) => x.libelle !== '');
    console.log('create', form.value);
    // , sousetapes: form.value.substeps
    this.stepService.create({libelle: form.value.name, description: form.value.description, statut: form.value.status, workflowId: this.workflowId}).subscribe();
    // this.closeDialog();
  }

  onUpdateSubmit(form: FormGroup): void {
    form.value.substeps = form.value.substeps.filter((x: SubstepFormValue) => x.libelle !== '');
    // , sousetapes: form.value.substeps
    console.log('update', form.value);
    //this.stepService.update({id: this.step.id, libelle: form.value.name, description: form.value.description, statut: form.value.status}).subscribe();
    //this.closeDialog();
  }

  onAddSubstep(): void {
    this.stepForm.controls.substeps.push(new FormControl<SubstepFormValue>({ libelle: '', description: '' }, { nonNullable: true }));
  }

  onRemoveSubstep(i: number): void {
    this.stepForm.controls.substeps.removeAt(i);
  }

  get substeps() {
    return this.stepForm.controls.substeps;
  }

  closeDialog() {
    //this.formValueEmitter.emit(null)
    this.ref.close();
  }
}
