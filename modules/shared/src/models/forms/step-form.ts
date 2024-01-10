import { FormArray, FormControl } from "@angular/forms";
import { SubstepFormValue } from "./substep-form";

export interface StepForm {
    libelle: FormControl<string>;
    description?: FormControl<string | null>;
    statut: FormControl<string>;
    sousEtapes: FormArray;
  };

export interface StepFormValue {
    id?: number | null;
    libelle: string;
    description?: string | null;
    statut: string;
    sousEtapes: SubstepFormValue[];
    workflowId: number;
}