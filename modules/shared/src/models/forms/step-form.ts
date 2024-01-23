import { FormArray, FormControl } from "@angular/forms";
import { SubstepFormValue } from "./substep-form";

export interface StepForm {
    libelle?: FormControl<string | null>;
    description?: FormControl<string | null>;
    statut?: FormControl<string | null>;
    sousEtapes: FormArray;
  };

export interface StepFormValue {
    id?: number | null;
    libelle?: string | null;
    description?: string | null;
    statut?: string | null;
    sousEtapes: SubstepFormValue[];
    workflowId?: number | null;
}