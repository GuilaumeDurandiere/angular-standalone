import { FormControl } from "@angular/forms";

export interface BusinessRequestForm {
  nom: FormControl<string>;
  prenom: FormControl<string>;
  poste: FormControl<string>;
  email: FormControl<string>;
  dateMiseEnService: FormControl<Date>;
  adresse: FormControl<string>;
  nomSite?: FormControl<string | null>;
  description: FormControl<string>;
};

export interface BusinessRequestFormValue {
  nom: string;
  prenom: string;
  email: string;
  poste: string;
  dateMiseEnService: Date;
  adresse: string;
  nomSite?: string | null;
  description: string;
}