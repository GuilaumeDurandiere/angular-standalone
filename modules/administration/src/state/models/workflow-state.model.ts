import { PaginationData, PaginationDto, Step, Substep, Workflow } from "@te44-front/shared";

export interface WorkflowStateModel {
  workflows: PaginationDto<Workflow> | null;
  workflow: Workflow | null;
  step: Step | null;
  substep: Substep | null;
  pagination: PaginationData;
}
