import { PaginationData, StepFormValue, SubstepFormValue, WorkflowFormValue } from "@te44-front/shared";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace WorkflowStateActions {

  export class Init {
    static readonly type = `[WorkflowState] Init`;
  }

  export class InitWorkflow {
    static readonly type = `[WorkflowState] InitWorkflow`;
    constructor(public id: number) { }
  }

  export class InitStep {
    static readonly type = `[WorkflowState] InitStep`;
    constructor(public id: number) { }
  }

  export class InitSubstep {
    static readonly type = `[WorkflowState] InitSubstep`;
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

  export class CreateStep {
    static readonly type = `[WorkflowState] CreateStep`;
    constructor(public stepFormValue: StepFormValue, public workflowId: number) { }
  }

  export class CreateSubstep {
    static readonly type = `[WorkflowState] CreateSubstep`;
    constructor(public substepFormValue: SubstepFormValue, public etapeId: number) { }
  }

  export class GetOne {
    static readonly type = `[WorkflowState] GetOne`;
    constructor(public id: number) { }
  }

  export class Update {
    static readonly type = `[WorkflowState] Update`;
    constructor(public workflowFormValue: WorkflowFormValue) { }
  }

  export class UpdateStep {
    static readonly type = `[WorkflowState] UpdateStep`;
    constructor(public stepFormValue: StepFormValue, public stepId: number) { }
  }

  export class UpdateSubstep {
    static readonly type = `[WorkflowState] UpdateSubstep`;
    constructor(public substepFormValue: SubstepFormValue, public substepId: number) { }
  }

  export class Refresh {
    static readonly type = `[WorkflowState] Refresh`;
  }

  export class RefreshStep {
    static readonly type = `[WorkflowState] RefreshStep`;
  }

  export class RefreshSubstep {
    static readonly type = `[WorkflowState] RefreshSubstep`;
  }

  export class Delete {
    static readonly type = `[WorkflowState] Delete`;
    constructor(public id: number) { }
  }

  export class DeleteStep {
    static readonly type = `[WorkflowState] DeleteStep`;
    constructor(public id: number) { }
  }

  export class DeleteSubstep {
    static readonly type = `[WorkflowState] DeleteSubstep`;
    constructor(public id: number) { }
  }
  export class Duplicate {
    static readonly type = `[WorkflowState] Duplicate`;
    constructor(public id: number, public label: string) { }
  }
}



