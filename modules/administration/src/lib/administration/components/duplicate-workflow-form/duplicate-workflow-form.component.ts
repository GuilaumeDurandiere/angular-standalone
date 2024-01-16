import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormControlPresenterComponent, FormGroupPresenterComponent, IconUploaderComponent, DuplicateWorkflowForm, DuplicateWorkflowFormValue } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-duplicate-workflow-form',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormGroupPresenterComponent, FormControlPresenterComponent, InputTextModule, ReactiveFormsModule, IconUploaderComponent],
  templateUrl: './duplicate-workflow-form.component.html',
  styleUrl: './duplicate-workflow-form.component.less',
})
export class DuplicateWorkflowFormComponent {

  @Output() formValueEmitter = new EventEmitter<DuplicateWorkflowFormValue | null>();

  formGroup: FormGroup<DuplicateWorkflowForm> = this.formBuilder.nonNullable.group<DuplicateWorkflowForm>({
    libelle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  })
  disabled$: Observable<boolean> = this.formGroup.statusChanges.pipe(
    map((status: string) => status !== 'VALID')
  );

  constructor(private formBuilder: FormBuilder) {
  }

  cancel(): void {
    this.formValueEmitter.emit(null);
  }

  validate(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.invalid) {
      console.log('error');
      console.log(this.formGroup.controls.libelle.errors);
    // let result = this.getFormErrors(this.formGroup);
    } else {
      this.formValueEmitter.emit(this.formGroup.getRawValue());
    }
  }
}
