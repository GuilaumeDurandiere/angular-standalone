import { FormControl } from "@angular/forms";

export interface RequestForm {
  telephone: FormControl<string>;
  message?: FormControl<string>;
};

export interface RequestFormValue {
  telephone: string;
  message?: string;
}