import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PaginationDto, Step, StepHttpService, Workflow, WorkflowHttpService } from '@te44-front/shared';
import { tap } from 'rxjs';
import { WorkflowStateActions } from './actions/workflow.actions';
import { WorkflowStateModel } from './models/workflow-state.model';

export const initWorkflowStateModel: WorkflowStateModel = {
  workflows: null,
  workflow: null,
  step: null,
  pagination: { pageIndex: 1, pageSize: 15 }
};

@State<WorkflowStateModel>({
  name: 'Workflow',
  defaults: initWorkflowStateModel,
})
@Injectable()
export class WorkflowState {

  constructor(private workflowHttpService: WorkflowHttpService, private stepHttpService: StepHttpService) { }

  @Selector()
  static getWorkflows(state: WorkflowStateModel): PaginationDto<Workflow> | null {
    return state.workflows;
  }

  @Selector()
  static getWorkflow(state: WorkflowStateModel): Workflow | null {
    return state.workflow;
  }

  @Selector()
  static getStep(state: WorkflowStateModel): Step | null {
    return state.step;
  }

  @Action(WorkflowStateActions.Init)
  init(ctx: StateContext<WorkflowStateModel>) {
    const pagination = ctx.getState().pagination
    ctx.dispatch(new WorkflowStateActions.LoadPageData(pagination))
  }

  @Action(WorkflowStateActions.InitWorkflow)
  initWorkflow(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.InitWorkflow) {
    return this.workflowHttpService.getOne(action.id).pipe(
      tap((workflow: Workflow) => ctx.patchState({ workflow }))
    )
  }

  @Action(WorkflowStateActions.InitStep)
  initStep(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.InitStep) {
    return this.stepHttpService.getOne(action.id).pipe(
      tap((step: Step) => ctx.patchState({ step }))
    )
  }

  @Action(WorkflowStateActions.Create)
  create(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.Create) {
    return this.workflowHttpService.create(action.workflowFormValue).pipe(
      tap(() => ctx.dispatch(new WorkflowStateActions.Refresh()))
    )
  }

  @Action(WorkflowStateActions.Update)
  update(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.Update) {
    return this.workflowHttpService.update(action.workflowFormValue).pipe(
      tap(() => ctx.dispatch(new WorkflowStateActions.Refresh()))
    )
  }

  @Action(WorkflowStateActions.LoadPageData)
  loadPageData(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.LoadPageData) {
    const pagination = action.paginationData;
    return this.workflowHttpService.getAll(pagination.pageIndex, pagination.pageSize).pipe(
      tap((workflows: PaginationDto<Workflow>) => ctx.patchState({
        workflows: workflows,
        pagination: { pageIndex: workflows.pageIndex, pageSize: workflows.pageSize }
      }))
    )
  }

  @Action(WorkflowStateActions.Refresh)
  refresh(ctx: StateContext<WorkflowStateModel>): void {
    ctx.dispatch(new WorkflowStateActions.Init);
  }

  @Action(WorkflowStateActions.Delete)
  delete(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.Delete) {
    return this.workflowHttpService.delete(action.id).pipe(
      tap(() => ctx.dispatch(new WorkflowStateActions.Refresh()))
    )
  }
}
