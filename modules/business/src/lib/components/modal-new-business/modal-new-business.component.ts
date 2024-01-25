import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlPresenterComponent, FormGroupPresenterComponent, RequestForm, RequestFormValue } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Observable, map, startWith } from 'rxjs';
@Component({
  selector: 'app-modal-new-business',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    FormControlPresenterComponent,
    FormGroupPresenterComponent,
    InputMaskModule,
    InputTextareaModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-new-business.component.html',
  styleUrl: './modal-new-business.component.less',
})
export class ModalNewBusinessComponent {
  formGroup: FormGroup = this.formBuilder.group<RequestForm>({
    message: new FormControl<string | null>(''),
    telephone: new FormControl<string>('', { validators: Validators.required, nonNullable: true })
  })

  disabled$: Observable<boolean> = this.formGroup.statusChanges.pipe(startWith('INVALID'), map((status: string) => status !== 'VALID'))

  title: string = this.config.data.name;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) { }

  cancel(): void {
    this.ref.close();
  }

  validate(): void {
    if (this.formGroup.valid) {
      const result: RequestFormValue = this.formGroup.getRawValue();

      this.ref.close({ ...result, telephone: result.telephone.replace(/\./g, '') });
    }
  }
}
