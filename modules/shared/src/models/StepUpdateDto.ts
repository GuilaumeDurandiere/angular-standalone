import { SubstepCreateDto } from "./SubstepCreateDto";
import { SubstepUpdateDto } from "./SubstepUpdateDto";

export interface StepUpdateDto {
    id: number;
    libelle: string;
    description?: string;
    statut: string;
    sousetapes?: Array<SubstepCreateDto | SubstepUpdateDto>;
}