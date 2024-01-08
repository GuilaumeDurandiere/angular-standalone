import { FormControl } from "@angular/forms";
import { OfferTypeEnum } from "../_index";

export interface SubThemeForm {
  libelle: FormControl<string>;
  couleur: FormControl<string>;
  icon: FormControl<string>;
  description: FormControl<string>;
  refTypeOffreId: FormControl<OfferTypeEnum | null>;
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
  icon: string;
  descritpion: string;
  refTypeOffreId: OfferTypeEnum | null;
  mailReferent?: string;
  workflowTravauxSimplifie?: boolean;
  workflowId?: number;
  accessibleATous?: boolean;
  lienExterne?: string;
}