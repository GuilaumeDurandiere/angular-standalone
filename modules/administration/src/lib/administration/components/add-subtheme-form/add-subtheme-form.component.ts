import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { FormControlPresenterComponent, FormGroupPresenterComponent, SubThemeForm, SubThemeFormValue } from '@te44-front/shared';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-add-subtheme-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, FormControlPresenterComponent, FormGroupPresenterComponent],
  templateUrl: './add-subtheme-form.component.html',
  styleUrl: './add-subtheme-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AddSubthemeFormComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: AddSubthemeFormComponent },
  ],
})
export class AddSubthemeFormComponent implements ControlValueAccessor, OnDestroy, Validator {
  destroy$ = new Subject<void>();

  formGroup: FormGroup<SubThemeForm> = this.formBuilder.group<SubThemeForm>({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
  })

  onTouched: Function = () => { };
  onChangeSubs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) { }

  registerOnChange(fn: any): void {
    const sub = this.formGroup.valueChanges.subscribe(fn);
    this.onChangeSubs.push(sub);
  }

  writeValue(value: SubThemeFormValue): void {
    if (value) {
      this.formGroup.patchValue({ ...value });
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

}
