import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { OfferTypeEnum, PaginationDto, Subtheme, SubthemeHttpService, Theme, ThemeHttpService, WorkflowHttpService } from '@te44-front/shared';
import { tap } from 'rxjs';
import { ThemeStateActions } from './actions/theme.actions';
import { ThemeStateModel } from './models/theme-state.model';

export const initThemeStateModel: ThemeStateModel = {
  themes: null,
  theme: null,
  workflows: [],
  pagination: { pageIndex: 1, pageSize: 5, sortField: 'nom', sortOrder: 'asc' }
};

@State<ThemeStateModel>({
  name: 'Theme',
  defaults: initThemeStateModel,
})
@Injectable()
export class ThemeState {

  constructor(
    private themeHttpService: ThemeHttpService,
    private workflowHttpService: WorkflowHttpService,
    private subthemeHttpService: SubthemeHttpService
  ) { }

  /*************
   * SELECTORS *
   *************/

  @Selector()
  static getThemes(state: ThemeStateModel): PaginationDto<Theme> | null {
    return state.themes
  }

  @Selector()
  static getTheme(state: ThemeStateModel): Theme | null {
    return state.theme
  }

  @Selector()
  static getSubthemeSimple(state: ThemeStateModel): Subtheme[] | undefined {
    return state.theme?.sousThemes?.filter((subtheme: Subtheme) => subtheme.refTypeOffre.id === OfferTypeEnum.FORMULAIRE_SIMPLIFIE)
  }

  @Selector()
  static getSubthemeLink(state: ThemeStateModel): Subtheme[] | undefined {
    return state.theme?.sousThemes?.filter((subtheme: Subtheme) => subtheme.refTypeOffre.id === OfferTypeEnum.LIEN_EXTERNE)
  }

  @Selector()
  static getSubthemeExcludingWork(state: ThemeStateModel): Subtheme[] | undefined {
    return state.theme?.sousThemes?.filter((subtheme: Subtheme) => subtheme.refTypeOffre.id === OfferTypeEnum.DEMANDE_HORS_TRAVAUX)
  }

  @Selector()
  static getSubthemeWork(state: ThemeStateModel): Subtheme[] | undefined {
    return state.theme?.sousThemes?.filter((subtheme: Subtheme) => subtheme.refTypeOffre.id === OfferTypeEnum.DEMANDE_TRAVAUX)
  }

  @Selector()
  static getWorkflow(state: ThemeStateModel): { libelle: string, id: number }[] {
    return state.workflows;
  }

  /***********
   * Actions *
   ***********/

  @Action(ThemeStateActions.InitWorflow)
  initWorkflow(ctx: StateContext<ThemeStateModel>) {
    return this.workflowHttpService.getActive().pipe(
      tap((workflows: { libelle: string, id: number }[]) => ctx.patchState({ workflows }))
    )
  }

  @Action(ThemeStateActions.InitTheme)
  initTheme(ctx: StateContext<ThemeStateModel>, action: ThemeStateActions.InitTheme) {
    return this.themeHttpService.get(action.id).pipe(
      tap((theme: Theme) => ctx.patchState({ theme }))
    )
  }

  @Action(ThemeStateActions.Create)
  create(ctx: StateContext<ThemeStateModel>, action: ThemeStateActions.Create) {
    return this.themeHttpService.create(action.themeFormValue).pipe(
      tap(() => ctx.dispatch(new ThemeStateActions.Refresh()))
    )
  }

  @Action(ThemeStateActions.CreateSubtheme)
  createSubthem(ctx: StateContext<ThemeStateModel>, action: ThemeStateActions.CreateSubtheme) {
    return this.subthemeHttpService.create({ ...action.subthemeFormValue, themeId: action.themeId }).pipe(
      tap(() => ctx.dispatch(new ThemeStateActions.RefreshSubtheme()))
    )
  }

  @Action(ThemeStateActions.Update)
  update(ctx: StateContext<ThemeStateModel>, action: ThemeStateActions.Update) {
    return this.themeHttpService.update({ ...action.themeFormValue, id: action.themeId }).pipe(
      tap(() => ctx.dispatch(new ThemeStateActions.Refresh()))
    )
  }

  @Action(ThemeStateActions.UpdateSubtheme)
  updateSubthem(ctx: StateContext<ThemeStateModel>, action: ThemeStateActions.UpdateSubtheme) {
    return this.subthemeHttpService.update({ ...action.subthemeFormValue, id: action.subthemeId }).pipe(
      tap(() => ctx.dispatch(new ThemeStateActions.RefreshSubtheme()))
    )
  }


  @Action(ThemeStateActions.LoadPageData)
  loadPageData(ctx: StateContext<ThemeStateModel>, action: ThemeStateActions.LoadPageData) {
    const pagination = action.paginationData;
    return this.themeHttpService.getPaginated(pagination.pageIndex, pagination.pageSize, pagination.sortField, pagination.sortOrder).pipe(
      tap((themes: PaginationDto<Theme>) => ctx.patchState({
        themes,
        pagination: { ...pagination, pageIndex: themes.pageIndex, pageSize: themes.pageSize }
      }))
    )
  }

  @Action(ThemeStateActions.DeleteTheme)
  deleteTheme(ctx: StateContext<ThemeStateModel>, action: ThemeStateActions.DeleteTheme) {
    return this.themeHttpService.delete(action.themeId).pipe(
      tap(() => ctx.dispatch(new ThemeStateActions.Refresh()))
    )
  }

  @Action(ThemeStateActions.DeleteSubtheme)
  deleteSubtheme(ctx: StateContext<ThemeStateModel>, action: ThemeStateActions.DeleteSubtheme) {
    return this.subthemeHttpService.delete(action.subthemeId).pipe(
      tap(() => ctx.dispatch(new ThemeStateActions.Refresh()))
    )
  }

  @Action(ThemeStateActions.Refresh)
  refresh(ctx: StateContext<ThemeStateModel>) {
    const pagination = ctx.getState().pagination;
    return this.themeHttpService.getPaginated(pagination.pageIndex, pagination.pageSize, pagination.sortField, pagination.sortOrder).pipe(
      tap((themes: PaginationDto<Theme>) => ctx.patchState({
        themes: themes,
        pagination: { ...pagination, pageIndex: themes.pageIndex, pageSize: themes.pageSize }
      }))
    )
  }

  @Action(ThemeStateActions.RefreshSubtheme)
  refreshSubtheme(ctx: StateContext<ThemeStateModel>) {
    const id = ctx.getState().theme?.id;
    if (!id) {
      return;
    }
    return this.themeHttpService.get(id).pipe(
      tap((theme: Theme) => ctx.patchState({
        theme: theme,
      }))
    )

  }



}
