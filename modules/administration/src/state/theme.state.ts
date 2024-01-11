import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PaginationDto, Theme, ThemeHttpService, WorkflowHttpService } from '@te44-front/shared';
import { tap } from 'rxjs';
import { ThemeStateActions } from './actions/theme.actions';
import { ThemeStateModel } from './models/theme-state.model';

export const initThemeStateModel: ThemeStateModel = {
  themes: null,
  workflow: [],
  pagination: { pageIndex: 1, pageSize: 5 }
};

@State<ThemeStateModel>({
  name: 'Theme',
  defaults: initThemeStateModel,
})
@Injectable()
export class ThemeState {

  constructor(private themeHttpService: ThemeHttpService, private workflowHttpService: WorkflowHttpService) { }

  @Selector()
  static getTheme(state: ThemeStateModel): PaginationDto<Theme> | null {
    return state.themes
  }

  @Selector()
  static getWorkflow(state: ThemeStateModel): { libelle: string, id: number }[] {
    return state.workflow;
  }

  @Action(ThemeStateActions.InitWorflow)
  init(ctx: StateContext<ThemeStateModel>) {
    return this.workflowHttpService.getActive().pipe(
      tap((value: { libelle: string, id: number }[]) => ctx.patchState({ workflow: value }))
    )
  }

  @Action(ThemeStateActions.Create)
  create(ctx: StateContext<ThemeStateModel>, action: ThemeStateActions.Create) {
    return this.themeHttpService.create(action.themeFormValue).pipe(
      tap(() => ctx.dispatch(new ThemeStateActions.Refresh()))
    )
  }

  @Action(ThemeStateActions.LoadPageData)
  loadPageData(ctx: StateContext<ThemeStateModel>, action: ThemeStateActions.LoadPageData) {
    const pagination = action.paginationData;
    return this.themeHttpService.getPaginated(pagination.pageIndex, pagination.pageSize).pipe(
      tap((themes: PaginationDto<Theme>) => ctx.patchState({
        themes: themes,
        pagination: { pageIndex: themes.pageIndex, pageSize: themes.pageSize }
      }))
    )
  }

  @Action(ThemeStateActions.Refresh)
  refresh(ctx: StateContext<ThemeStateModel>) {
    const pagination = ctx.getState().pagination;
    return this.themeHttpService.getPaginated(pagination.pageIndex, pagination.pageSize).pipe(
      tap((themes: PaginationDto<Theme>) => ctx.patchState({
        themes: themes,
        pagination: { pageIndex: themes.pageIndex, pageSize: themes.pageSize }
      }))
    )
  }



}
