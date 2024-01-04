import { FormArray, FormControl } from "@angular/forms";
import { SubstepFormValue } from "./substep-form";

export interface StepForm {
    name: FormControl<string>;
    description?: FormControl<string | null>;
    status: FormControl<string>;
    substeps: FormArray;
  };

export interface StepFormValue {
    name: string;
    description?: string | null;
    status: string;
    substeps: SubstepFormValue;
}