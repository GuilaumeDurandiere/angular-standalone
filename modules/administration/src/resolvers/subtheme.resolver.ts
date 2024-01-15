import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Store } from "@ngxs/store";
import { ThemeStateActions } from "../state/actions/theme.actions";

export const subthemeResolver: ResolveFn<void> =

  (route: ActivatedRouteSnapshot): void => {
    const id: string | null = route.paramMap.get('id')
    if (id) {
      const store = inject(Store);
      store.dispatch(new ThemeStateActions.InitTheme(parseInt(id)));
    }
  };