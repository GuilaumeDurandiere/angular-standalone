import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { FormControlPresenterComponent, UpdateWorkflowForm, WorkflowFormValue } from '@te44-front/shared';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-update-workflow-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, FormControlPresenterComponent, InputSwitchModule ],
  templateUrl: './update-workflow-form.component.html',
  styleUrl: './update-workflow-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: UpdateWorkflowFormComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: UpdateWorkflowFormComponent },
  ],
})
export class UpdateWorkflowFormComponent implements ControlValueAccessor, OnDestroy, Validator {
  destroy$ = new Subject<void>();
  workflowForm: FormGroup<UpdateWorkflowForm> = this.formBuilder.group<UpdateWorkflowForm>({
    libelle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    actif: new FormControl<boolean>(true, { nonNullable: true, validators: [Validators.required] }),
  });

  onTouched: Function = () => {};
  onChangeSubs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) { }

  registerOnChange(fn: any): void {
    const sub = this.workflowForm.valueChanges.subscribe(fn);
    this.onChangeSubs.push(sub);
  }

  writeValue(value: WorkflowFormValue): void {
    if (value) {
      this.workflowForm.patchValue({ ...value });
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.workflowForm.disable();
    } else {
      this.workflowForm.enable();
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
