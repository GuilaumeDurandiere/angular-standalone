import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Step, StepFormValue } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddStepFormComponent } from '../add-step-form/add-step-form.component';

@Component({
  selector: 'app-modal-upsert-step',
  standalone: true,
  imports: [CommonModule, ButtonModule, ReactiveFormsModule, AddStepFormComponent],
  templateUrl: './modal-upsert-step.component.html',
  styleUrl: './modal-upsert-step.component.less',
})
export class ModalUpsertStepComponent {
  formGroup: FormGroup = this.formBuilder.group({
    etapes: new FormControl<StepFormValue>({ libelle: '', description: '', statut: '', sousEtapes: [] }, { nonNullable: true })
  });
  valueForm: StepFormValue | undefined = undefined;
  step: Step | null = this.config.data?.step;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private formBuilder: FormBuilder) {
    if (this.step) {
      this.formGroup.controls['etapes'].patchValue(this.step);
    }
  }

  validate(): void {
    this.ref.close(this.formGroup.controls['etapes'].getRawValue());
  }

  cancel(): void {
    this.ref.close();
  }
}
