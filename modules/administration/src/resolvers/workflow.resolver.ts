import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Store } from "@ngxs/store";
import { WorkflowStateActions } from "../state/actions/workflow.actions";

export const workflowResolver: ResolveFn<void> =
  (route: ActivatedRouteSnapshot): void => {
    const id: string | null = route.paramMap.get('id')!;
    const store = inject(Store);
    store.dispatch(new WorkflowStateActions.InitWorkflow(parseInt(id)));
  };