import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Store } from "@ngxs/store";
import { BusinessStateActions } from "../state/actions/business.actions";

export const businessResolver: ResolveFn<void> =

  (): void => {
    const store = inject(Store);
    store.dispatch(new BusinessStateActions.InitThemes());
  };