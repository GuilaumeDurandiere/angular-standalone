import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Store } from "@ngxs/store";
import { WorkflowStateActions } from "../state/actions/workflow.actions";
import { Observable } from "rxjs";
import { Workflow } from "@te44-front/shared";
import { WorkflowState } from "../state/workflow.state";

export const workflowResolver: ResolveFn<Observable<Workflow | null> | null> =
  (route: ActivatedRouteSnapshot): Observable<Workflow | null> | null => {
    const id: string | null = route.paramMap.get('id')!;
    let workflow = null;
    const store = inject(Store);
    store.dispatch(new WorkflowStateActions.InitWorkflow(parseInt(id))).subscribe(() => workflow = store.select(WorkflowState.getWorkflow));
    return workflow;
  };