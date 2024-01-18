import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Substep, SubstepFormValue } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddSubstepFormComponent } from '../add-substep-form/add-substep-form.component';

@Component({
  selector: 'app-modal-upsert-substep',
  standalone: true,
  imports: [CommonModule, ButtonModule, ReactiveFormsModule, AddSubstepFormComponent],
  templateUrl: './modal-upsert-substep.component.html',
  styleUrl: './modal-upsert-substep.component.less',
})
export class ModalUpsertSubstepComponent {
  formGroup: FormGroup = this.formBuilder.group({
    sousEtapes: new FormControl<SubstepFormValue>({ libelle: '', description: '' }, { nonNullable: true })
  });
  valueForm: SubstepFormValue | undefined = undefined;
  substep: Substep | null = this.config.data?.substep;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private formBuilder: FormBuilder) {
    if (this.substep) {
      this.formGroup.controls['sousEtapes'].patchValue(this.substep);
    }
  }

  validate(): void {
    this.ref.close(this.formGroup.controls['sousEtapes'].getRawValue());
  }

  cancel(): void {
    this.ref.close();
  }
}
