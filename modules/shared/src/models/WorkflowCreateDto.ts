import { StepCreateDto } from "./StepCreateDto";

export interface WorkflowCreateDto {
    libelle: string;
    etapes: StepCreateDto[];
};