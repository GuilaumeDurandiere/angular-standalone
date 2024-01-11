import { PaginationData, WorkflowFormValue } from "@te44-front/shared";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace WorkflowStateActions {

  export class Init {
    static readonly type = `[WorkflowState] Init`;
  }

  export class InitWorkflow {
    static readonly type = `[WorkflowState] InitWorkflow`;
    constructor(public id: number) { }
  }

  export class LoadPageData {
    static readonly type = `[WorkflowState] LoadPageData`;
    constructor(public paginationData: PaginationData) { }
  }

  export class Create {
    static readonly type = `[WorkflowState] Create`;
    constructor(public workflowFormValue: WorkflowFormValue) { }
  }

  export class GetOne {
    static readonly type = `[WorkflowState] GetOne`;
    constructor(public id: number) { }
  }

  export class Update {
    static readonly type = `[WorkflowState] Update`;
    constructor(public workflowFormValue: WorkflowFormValue) { }
  }

  export class Refresh {
    static readonly type = `[WorkflowState] Refresh`;
  }

  export class Delete {
    static readonly type = `[WorkflowState] Delete`;
    constructor(public id: number) { }
  }
}



