import { Workflow } from "../zod/Workflow.zod";

export interface PaginationWorkflowDto {
    results: Workflow[];
    totalPages: number;
    pageIndex: number;
    pageSize: number;
  }