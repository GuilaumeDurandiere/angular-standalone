import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Store } from "@ngxs/store";
import { WorkflowStateActions } from "../state/actions/workflow.actions";
import { Step } from "@te44-front/shared";
import { Observable } from "rxjs";
import { WorkflowState } from "../state/workflow.state";

export const stepResolver: ResolveFn<Observable<Step | null>> =
(route: ActivatedRouteSnapshot): Observable<Step | null> => {
  const id: string | null = route.paramMap.get('id')!;
    const store = inject(Store);
    store.dispatch(new WorkflowStateActions.InitStep(parseInt(id)));
    return store.select(WorkflowState.getStep);
};