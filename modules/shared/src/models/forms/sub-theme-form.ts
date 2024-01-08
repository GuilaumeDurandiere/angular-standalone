import { FormControl } from "@angular/forms";

export interface SubThemeForm {
  libelle: FormControl<string>;
  couleur: FormControl<string>;
  icon: FormControl<string>;
  description: FormControl<string>;
}

export interface SubThemeSimplifieForm extends SubThemeForm {
  mailReferent: FormControl<string>;
}

export interface SubThemeTravauxForm extends SubThemeForm {
  workflowTravauxSimplifie: FormControl<boolean>;
  workflowId: FormControl<number>;
  mailReferent: FormControl<string>;
}

export interface SubThemeHorsTravauxForm extends SubThemeTravauxForm {
  accessibleATous: FormControl<boolean>;
}

export interface SubThemeLienForm extends SubThemeForm {
  lienExterne: FormControl<string>;
}

export interface SubThemeFormValue {
  name: string;
  couleur: string;
  icon: string;
  descritpion: string;
  mailReferent?: string;
  workflowTravauxSimplifie?: boolean;
  workflowId?: number;
  accessibleATous?: boolean;
  lienExterne?: string;
}