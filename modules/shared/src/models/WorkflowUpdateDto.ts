import { StepUpdateDto } from "./StepUpdateDto";

export interface WorkflowUpdateDto {
    id: number;
    libelle: string;
    actif: boolean;
    etapes: StepUpdateDto;
}