import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Workflow } from "../zod/Workflow.zod";
import { WorkflowHttpService } from "../services/workflow-http.service";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export const workflowResolver: ResolveFn<Workflow> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Workflow> => {
      return inject(WorkflowHttpService).getOne(parseInt(route.paramMap.get('id')!, 10));
    };