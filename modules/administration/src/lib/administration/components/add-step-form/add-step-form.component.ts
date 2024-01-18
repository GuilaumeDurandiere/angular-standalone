import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { FormControlPresenterComponent, FormGroupPresenterComponent, StepForm, StepFormValue, SubstepForm, SubstepFormValue } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, Subscription } from 'rxjs';
import { AddSubstepFormComponent } from '../add-substep-form/add-substep-form.component';

@Component({
  selector: 'app-add-step-form',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, AddSubstepFormComponent, FormControlPresenterComponent, FormGroupPresenterComponent, ButtonModule],
  templateUrl: './add-step-form.component.html',
  styleUrl: './add-step-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AddStepFormComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: AddStepFormComponent },
  ],
})
export class AddStepFormComponent implements ControlValueAccessor, OnDestroy, Validator {
  @Input() isCreate = false;
  destroy$ = new Subject<void>();
  stepForm: FormGroup<StepForm> = this.formBuilder.group<StepForm>({
    libelle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string | null>('', { nonNullable: false }),
    statut: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    sousEtapes: new FormArray<FormGroup<SubstepForm>>([this.formBuilder.group<SubstepForm>({
      libelle: new FormControl<string>('', { nonNullable: false }),
      description: new FormControl<string | null>('', { nonNullable: false }),
    })]),
  });
  onTouched: Function = () => {};
  onChangeSubs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) { }

  registerOnChange(fn: any): void {
    const sub = this.stepForm.valueChanges.subscribe(fn);
    this.onChangeSubs.push(sub);
  }

  writeValue(value: StepFormValue): void {
    if (value) {
      this.stepForm.patchValue({ ...value });
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.stepForm.disable();
    } else {
      this.stepForm.enable();
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

  onAddSubstep(): void {
    this.stepForm.controls.sousEtapes.push(new FormControl<SubstepFormValue>({ libelle: '', description: '' }, { nonNullable: true }));
  }

  onRemoveSubstep(i: number): void {
    this.stepForm.controls.sousEtapes.removeAt(i);
  }

  get sousEtapes() {
    return this.stepForm.controls.sousEtapes;
  }
}
