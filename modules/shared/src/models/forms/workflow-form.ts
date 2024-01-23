import { FormArray, FormControl } from "@angular/forms";
import { StepFormValue } from "./step-form";

export interface WorkflowForm {
    libelle: FormControl<string>;
    etapes: FormArray;
  };

export interface WorkflowFormValue {
    id?: number;
    libelle: string;
    actif?: boolean | null;
    etapes: StepFormValue[];
}