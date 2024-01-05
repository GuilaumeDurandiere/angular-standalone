import { FormArray, FormControl } from "@angular/forms";
import { PrimeIcons } from "primeng/api";
import { SubThemeForm } from "./sub-theme-form";

export interface ThemeForm {
  icon: FormControl<PrimeIcons>;
  libelle: FormControl<string>;
  description: FormControl<string>;
  status: FormControl<boolean>;
  subtheme: FormArray;
};

export interface ThemeFormValue {
  icon: PrimeIcons;
  libelle: string;
  description: string;
  status: boolean;
  subtheme: SubThemeForm[];
}