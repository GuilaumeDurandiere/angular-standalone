import { FormControl } from "@angular/forms";
import { DemandeTypeEnum } from "../_index";

export interface SubThemeForm {
  libelle: FormControl<string>;
  couleur: FormControl<string>;
  icon: FormControl<string>;
  description: FormControl<string>;
  demandeType: FormControl<DemandeTypeEnum | null>;
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
  name: string;
  couleur: string;
  icon: string;
  descritpion: string;
  demandeType: DemandeTypeEnum | null;
  mailReferent?: string;
  workflowTravauxSimplifie?: boolean;
  workflowId?: number;
  accessibleATous?: boolean;
  lienExterne?: string;
}