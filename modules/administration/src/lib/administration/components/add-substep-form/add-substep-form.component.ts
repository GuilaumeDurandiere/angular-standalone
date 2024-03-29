import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { FormControlPresenterComponent, SubstepForm, SubstepFormValue, addControlErrors } from '@te44-front/shared';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-substep-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, FormControlPresenterComponent],
  templateUrl: './add-substep-form.component.html',
  styleUrl: './add-substep-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AddSubstepFormComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: AddSubstepFormComponent },
  ],
})
export class AddSubstepFormComponent implements ControlValueAccessor, OnDestroy, Validator {
  destroy$ = new Subject<void>();
  substepForm: FormGroup<SubstepForm> = this.formBuilder.group<SubstepForm>({
    libelle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
  });
  @Input() nameRequired: boolean = false;

  onTouched = () => { };
  onChangeSubs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) { }

  registerOnChange(fn: () => void): void {
    const sub = this.substepForm.valueChanges.subscribe(fn);
    this.onChangeSubs.push(sub);
  }

  writeValue(value: SubstepFormValue): void {
    if (value) {
      this.substepForm.patchValue({ ...value });
    }
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.substepForm.disable();
    } else {
      this.substepForm.enable();
    }
  }

  validate(): ValidationErrors | null {
    if (this.substepForm.valid) {
      return null;
    }

    let errors: ValidationErrors = {};
    errors = addControlErrors(errors, this.substepForm.controls.libelle, 'libelle');

    return errors;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }
}
