import { FormControl } from "@angular/forms";

export interface RequestForm {
  telephone: FormControl<string | null>;
  message: FormControl<string | null>;
};

export interface RequestFormValue {
  telephone: string | null;
  message: string | null;
}