import { FormControl } from "@angular/forms";

export interface SubThemeForm {
  libelle: FormControl<string>;
  couleur: FormControl<string>;
  icone: FormControl<string>;
  description: FormControl<string>;
  refTypeOffreId: FormControl<number>;
  // S / HT / T
  mailReferent?: FormControl<string>;
  // HT / T
  workflowTravauxSimplifie?: FormControl<boolean>;
  workflowId?: FormControl<number | null>;
  accessibleATous?: FormControl<boolean>;
  // L
  lienExterne?: FormControl<string>;
}

export interface SubThemeFormValue {
  libelle: string;
  couleur: string;
  icone: string;
  description: string;
  refTypeOffreId: number;
  mailReferent?: string;
  workflowTravauxSimplifie?: boolean;
  workflowId?: number;
  accessibleATous?: boolean;
  lienExterne?: string;
}