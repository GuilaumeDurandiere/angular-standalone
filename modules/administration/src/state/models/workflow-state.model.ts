import { PaginationData, Workflow } from "@te44-front/shared";

export interface WorkflowStateModel {
  workflows: Workflow[];
  workflow: Workflow | null;
  pagination: PaginationData;
}
