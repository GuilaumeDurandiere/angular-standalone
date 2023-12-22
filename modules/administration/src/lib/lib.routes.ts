import { Route } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { AdminWorkflowComponent } from './administration/components/admin-workflow/admin-workflow.component';

export const administrationRoutes: Route[] = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: 'workflow',
        component: AdminWorkflowComponent,
      }
    ]
  },
];
