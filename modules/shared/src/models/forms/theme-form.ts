import { FormArray, FormControl } from "@angular/forms";
import { SubThemeForm } from "./sub-theme-form";

export interface ThemeForm {
  icone: FormControl<string>;
  libelle: FormControl<string>;
  description: FormControl<string>;
  sousThemes: FormArray;
};

export interface ThemeFormValue {
  icone: string;
  libelle: string;
  description: string;
  sousThemes: SubThemeForm[];
}