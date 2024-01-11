import { PaginationData, PaginationDto, Workflow } from "@te44-front/shared";

export interface WorkflowStateModel {
  workflows: PaginationDto<Workflow> | null;
  workflow: Workflow | null;
  pagination: PaginationData;
}
