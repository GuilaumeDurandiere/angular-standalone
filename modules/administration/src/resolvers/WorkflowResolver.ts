import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Workflow } from '@te44-front/shared';
import { inject } from "@angular/core";
import { Observable, finalize, first, tap } from "rxjs";
import { WorkflowStateActions } from "../state/actions/workflow.actions";
import { Store } from "@ngxs/store";
import { WorkflowState } from "../state/workflow.state";

export const workflowResolver: ResolveFn<Workflow | null> =
    // (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Workflow> => {
    //   return inject(WorkflowHttpService).getOne(parseInt(route.paramMap.get('id')!, 10));
    // };
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Workflow | null> => {
    const store = inject(Store);
    store.dispatch(new WorkflowStateActions.GetOne(parseInt(route.paramMap.get('id')!, 10)));
    return store.select(WorkflowState.getWorkflow);
    // let loading = false;
    // return store.pipe(
    //   tap(() => {
    //     if(!loading){
    //       loading = true;
    //       store.dispatch(new WorkflowStateActions.GetOne(parseInt(route.paramMap.get('id')!, 10)));
    //     }
    //  }),
    //  first(),
    //  finalize(() => loading = false)
    // );
};