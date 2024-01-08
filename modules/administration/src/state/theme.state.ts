import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PaginationDto, Theme, ThemeHttpService } from '@te44-front/shared';
import { tap } from 'rxjs';
import { ThemeStateActions } from './actions/theme.actions';
import { ThemeStateModel } from './models/theme-state.model';

export const initThemeStateModel: ThemeStateModel = {
  themes: [],
  pagination: { pageIndex: 0, pageSize: 5 }
};

@State<ThemeStateModel>({
  name: 'Theme',
  defaults: initThemeStateModel,
})
@Injectable()
export class ThemeState {

  constructor(private themeHttpService: ThemeHttpService) { }

  @Selector()
  static getTheme(state: ThemeStateModel): Theme[] {
    return state.themes
  }

  @Action(ThemeStateActions.Init)
  init(ctx: StateContext<ThemeStateModel>) {
    const pagination = ctx.getState().pagination
    ctx.dispatch(new ThemeStateActions.LoadPageData(pagination))
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
        themes: themes.results,
        pagination: themes
      }))
    )
  }

  @Action(ThemeStateActions.Refresh)
  refresh(ctx: StateContext<ThemeStateModel>): void {
    ctx.dispatch(new ThemeStateActions.Init);
  }



}
