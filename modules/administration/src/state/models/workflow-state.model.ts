import { PaginationData, PaginationDto, Step, Workflow } from "@te44-front/shared";

export interface WorkflowStateModel {
  workflows: PaginationDto<Workflow> | null;
  workflow: Workflow | null;
  step: Step | null;
  pagination: PaginationData;
}
