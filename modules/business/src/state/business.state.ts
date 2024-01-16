import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Subtheme, SubthemeHttpService, Theme, ThemeHttpService } from '@te44-front/shared';
import { tap } from 'rxjs';
import { BusinessStateActions } from './actions/business.actions';
import { BusinessStateModel } from './models/business-state.model';

export const initBusinessStateModel: BusinessStateModel = {
  themes: [],
  subthemes: [],
};

@State<BusinessStateModel>({
  name: 'Business',
  defaults: initBusinessStateModel,
})
@Injectable()
export class BusinessState {

  constructor(
    private themeHttpService: ThemeHttpService,
    private subthemeHttpService: SubthemeHttpService
  ) { }

  /*************
   * SELECTORS *
   *************/

  @Selector()
  static getThemes(state: BusinessStateModel): Theme[] {
    return state.themes
  }

  @Selector()
  static getSubthemes(state: BusinessStateModel): Subtheme[] {
    return state.subthemes
  }

  /***********
   * Actions *
   ***********/

  @Action(BusinessStateActions.InitThemes)
  initTheme(ctx: StateContext<BusinessStateModel>) {
    return this.themeHttpService.getAll().pipe(
      tap((themes: Theme[]) => ctx.patchState({ themes }))
    )
  }

  @Action(BusinessStateActions.getSubthemes)
  getSubtheme(ctx: StateContext<BusinessStateModel>, action: BusinessStateActions.getSubthemes) {
    return this.subthemeHttpService.getByTheme(action.themeId).pipe(
      tap((subthemes: Subtheme[]) => ctx.patchState({ subthemes }))
    )
  }

}
