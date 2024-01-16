import { FormControl } from "@angular/forms";

export interface DuplicateWorkflowForm {
  libelle: FormControl<string>;
};

export interface DuplicateWorkflowFormValue {
  libelle: string;
}