import { FormControl } from "@angular/forms";

export interface SubstepForm {
    libelle?: FormControl<string | null>;
    description?: FormControl<string | null>;
};

export interface SubstepFormValue {
    libelle?: string | null;
    description?: string | null;
};