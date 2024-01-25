import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessRequestForm, BusinessRequestFormValue, FormControlPresenterComponent } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-modal-new-business-request',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, ButtonModule, CalendarModule, InputTextareaModule, FormControlPresenterComponent],
  templateUrl: './modal-new-business-request.component.html',
  styleUrl: './modal-new-business-request.component.less',
})
export class ModalNewBusinessRequestComponent {
  fieldStyle = { 'width': '25rem' };
  isHorsTravaux: boolean = this.config.data.isHorsTravaux;
  formGroup: FormGroup<BusinessRequestForm> = this.formBuilder.group<BusinessRequestForm>({
    nom: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    prenom: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    email: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    poste: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    adresse: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    dateMiseEnService: new FormControl<Date>(new Date(), { validators: Validators.required, nonNullable: true }),
    nomSite: new FormControl<string | null>(''),
    description: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
  });

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
      const result: BusinessRequestFormValue = this.formGroup.getRawValue();
      this.ref.close(result);
    }
  }
}
