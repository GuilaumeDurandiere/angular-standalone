import { Route } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { AdminSelectionComponent } from './administration/components/admin-selection/admin-selection.component';
import { AdminWorkflowComponent } from './administration/components/admin-workflow/admin-workflow.component';
import { AdminStepComponent } from './administration/components/admin-step/admin-step.component';
import { workflowResolver } from '@te44-front/shared';

export const administrationRoutes: Route[] = [
  {
    path: '',
    component: AdministrationComponent,
    data: {
      breadcrumb: $localize`:@@ADMINISTRATION:Administration`
    },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: AdminSelectionComponent,
      },
      {
        path: 'workflow',
        component: AdminWorkflowComponent,
        data: {
          breadcrumb: $localize`:@@WORKFLOW_TABLE:Tableau des workflow`
        },
      },
      {
        path: 'workflow/:id',
        component: AdminStepComponent,
        resolve: { workflow: workflowResolver },
        data: {
          breadcrumb: (data: any) => `${data.workflow.libelle}`,
        },
      }
    ]
  },
];
