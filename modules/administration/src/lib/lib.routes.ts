import { Route } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { AdminWorkflowComponent } from './administration/components/admin-workflow/admin-workflow.component';

export const administrationRoutes: Route[] = [
  {
    path: '',
    component: AdministrationComponent,
    data: {
      breadcrumb: $localize`:@@ADMINISTRATION:Administration`
    },
    children: [
      {
        path: 'workflow',
        component: AdminWorkflowComponent,
        data: {
          breadcrumb: $localize`:@@WORKFLOW_TABLE:Tableau des workflow`
        }
      }
    ]
  },
];
