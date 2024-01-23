import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MailHttpService, Subtheme, SubthemeHttpService, Theme, ThemeHttpService } from '@te44-front/shared';
import { StateReset } from 'ngxs-reset-plugin';
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
    private mailHttpService: MailHttpService,
    private subthemeHttpService: SubthemeHttpService,
    private themeHttpService: ThemeHttpService,
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

  @Action(BusinessStateActions.GetSubthemes)
  getSubthemes(ctx: StateContext<BusinessStateModel>, action: BusinessStateActions.GetSubthemes) {
    return this.subthemeHttpService.getByTheme(action.themeId).pipe(
      tap((subthemes: Subtheme[]) => ctx.patchState({ subthemes }))
    )
  }

  @Action(BusinessStateActions.SendRequestForm)
  sendRequestForm(ctx: StateContext<BusinessStateModel>, action: BusinessStateActions.SendRequestForm) {
    return this.mailHttpService.formulaireSimplifie({ ...action.data, sousThemeId: action.subthemeId });
  }

  @Action(BusinessStateActions.Reset)
  reset(ctx: StateContext<BusinessStateModel>) {
    ctx.dispatch(new StateReset(BusinessState));
  }

}
