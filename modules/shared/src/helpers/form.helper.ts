import { AbstractControl, ValidationErrors } from "@angular/forms";

export function addControlErrors(allErrors: ValidationErrors, control: AbstractControl | undefined, controlName: string): ValidationErrors {
  const errors = { ...allErrors };

  if (control?.errors) {
    errors[controlName] = control.errors;
  }

  return errors;
}