import { SubstepCreateDto } from "./SubstepCreateDto";

export interface StepCreateDto {
    libelle?: string | null;
    description?: string | null;
    statut?: string | null;
    workflowId?: number | null;
    sousEtapes: Array<SubstepCreateDto>;
};