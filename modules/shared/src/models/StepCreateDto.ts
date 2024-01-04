import { SubstepCreateDto } from "./SubstepCreateDto";

export interface StepCreateDto {
    libelle: string;
    description?: string;
    statut: string;
    workflowId: number;
    sousetapes?: Array<SubstepCreateDto>
};