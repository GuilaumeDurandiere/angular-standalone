import { SubstepCreateDto } from "./SubstepCreateDto";

export interface StepCreateDto {
    libelle: string;
    description?: string | null;
    statut: string;
    workflowId?: number | null;
    sousEtapes: Array<SubstepCreateDto>
};