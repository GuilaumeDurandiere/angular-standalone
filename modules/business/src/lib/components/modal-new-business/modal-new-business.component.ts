import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlPresenterComponent, FormGroupPresenterComponent } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-modal-new-business',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    FormControlPresenterComponent,
    FormGroupPresenterComponent,
    InputMaskModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-new-business.component.html',
  styleUrl: './modal-new-business.component.less',
})
export class ModalNewBusinessComponent {

  formGroup: FormGroup = this.formBuilder.group({
    message: new FormControl<string>(''),
    telephone: new FormControl<string | null>(null, { validators: Validators.required })
  })

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef
  ) { }

  cancel(): void {
    this.ref.close();
  }

  validate(): void {
    this.formGroup.updateValueAndValidity();
    this.formGroup.markAllAsTouched();
    this.formGroup.markAsTouched();
    this.formGroup.markAsDirty();
    if (this.formGroup.valid) {
      this.ref.close(this.formGroup.getRawValue());
    }
  }
}
