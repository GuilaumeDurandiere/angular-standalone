import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PaginationDto, Step, StepHttpService, Substep, SubstepHttpService, Workflow, WorkflowHttpService } from '@te44-front/shared';
import { tap } from 'rxjs';
import { WorkflowStateActions } from './actions/workflow.actions';
import { WorkflowStateModel } from './models/workflow-state.model';

export const initWorkflowStateModel: WorkflowStateModel = {
  workflows: null,
  workflow: null,
  step: null,
  substep: null,
  pagination: { pageIndex: 1, pageSize: 15 }
};

@State<WorkflowStateModel>({
  name: 'Workflow',
  defaults: initWorkflowStateModel,
})
@Injectable()
export class WorkflowState {

  constructor(private workflowHttpService: WorkflowHttpService, private stepHttpService: StepHttpService, private substepHttpService: SubstepHttpService) { }

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

  @Selector()
  static getSubstep(state: WorkflowStateModel): Substep | null {
    return state.substep;
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

  @Action(WorkflowStateActions.InitSubstep)
  initSubstep(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.InitSubstep) {
    return this.substepHttpService.getOne(action.id).pipe(
      tap((substep: Substep) => ctx.patchState({ substep }))
    )
  }

  @Action(WorkflowStateActions.Create)
  create(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.Create) {
    return this.workflowHttpService.create(action.workflowFormValue).pipe(
      tap(() => ctx.dispatch(new WorkflowStateActions.Refresh()))
    )
  }

  @Action(WorkflowStateActions.CreateStep)
  createStep(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.CreateStep) {
    return this.stepHttpService.create({...action.stepFormValue, workflowId: action.workflowId}).pipe(
      tap(() => ctx.dispatch(new WorkflowStateActions.RefreshStep()))
    )
  }

  @Action(WorkflowStateActions.CreateSubstep)
  createSubstep(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.CreateSubstep) {
    return this.substepHttpService.create({...action.substepFormValue, etapeId: action.etapeId}).pipe(
      tap(() => ctx.dispatch(new WorkflowStateActions.RefreshSubstep()))
    )
  }

  @Action(WorkflowStateActions.Update)
  update(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.Update) {
    return this.workflowHttpService.update(action.workflowFormValue).pipe(
      tap(() => ctx.dispatch(new WorkflowStateActions.Refresh()))
    )
  }

  @Action(WorkflowStateActions.UpdateStep)
  updateStep(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.UpdateStep) {
    return this.stepHttpService.update(action.stepFormValue).pipe(
      tap(() => ctx.dispatch(new WorkflowStateActions.RefreshStep()))
    )
  }

  @Action(WorkflowStateActions.UpdateSubstep)
  updateSubstep(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.UpdateSubstep) {
    return this.substepHttpService.update(action.substepFormValue).pipe(
      tap(() => ctx.dispatch(new WorkflowStateActions.RefreshSubstep()))
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
  refresh(ctx: StateContext<WorkflowStateModel>) {
    const pagination = ctx.getState().pagination;
    return this.workflowHttpService.getAll(pagination.pageIndex, pagination.pageSize).pipe(
      tap((workflows: PaginationDto<Workflow>) => ctx.patchState({
        workflows: workflows,
        pagination: { pageIndex: workflows.pageIndex, pageSize: workflows.pageSize }
      }))
    )
  }

  @Action(WorkflowStateActions.RefreshStep)
  refreshStep(ctx: StateContext<WorkflowStateModel>) {
    const id = ctx.getState().workflow?.id;
    if (!id) {
      return;
    }
    return this.workflowHttpService.getOne(id).pipe(
      tap((workflow: Workflow) => ctx.patchState({
        workflow,
      }))
    )
  }

  @Action(WorkflowStateActions.RefreshSubstep)
  refreshSubstep(ctx: StateContext<WorkflowStateModel>) {
    const id = ctx.getState().step?.id;
    if (!id) {
      return;
    }
    return this.stepHttpService.getOne(id).pipe(
      tap((step: Step) => ctx.patchState({
        step,
      }))
    )
  }

  @Action(WorkflowStateActions.Delete)
  delete(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.Delete) {
    return this.workflowHttpService.delete(action.id).pipe(
      tap(() => ctx.dispatch(new WorkflowStateActions.Refresh()))
    )
  }

  @Action(WorkflowStateActions.DeleteStep)
  deleteStep(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.DeleteStep) {
    return this.stepHttpService.delete(action.id).pipe(
      tap(() => ctx.dispatch(new WorkflowStateActions.RefreshStep()))
    )
  }

  @Action(WorkflowStateActions.DeleteSubstep)
  deleteSubstep(ctx: StateContext<WorkflowStateModel>, action: WorkflowStateActions.DeleteSubstep) {
    return this.substepHttpService.delete(action.id).pipe(
      tap(() => ctx.dispatch(new WorkflowStateActions.RefreshSubstep()))
    )
  }
}
