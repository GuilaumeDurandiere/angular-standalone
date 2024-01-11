import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { workflowResolver } from '../resolvers/workflow.resolver';
import { ThemeState } from '../state/theme.state';
import { WorkflowState } from '../state/workflow.state';
import { AdministrationComponent } from './administration/administration.component';
import { AdminSelectionComponent } from './administration/components/admin-selection/admin-selection.component';
import { AdminStepComponent } from './administration/components/admin-step/admin-step.component';
import { AdminThemeComponent } from './administration/components/admin-theme/admin-theme.component';
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
        data: {
          breadcrumb: $localize`:@@WORKFLOW_TABLE:Tableau des workflow`
        },
        providers: [importProvidersFrom(NgxsModule.forFeature([WorkflowState]))],
        children: [
          {
            path: '',
            component: AdminWorkflowComponent,
            data: {
              breadcrumb: null
            }
          },
          {
            path: ':id',
            component: AdminStepComponent,
            resolve: { workflow: workflowResolver },
            data: {
              breadcrumb: (data: any) => `${data.workflow.libelle}`,
            },
          }
        ]
      },
      {
        path: 'theme',
        data: {
          breadcrumb: $localize`:@@WORKFLOW_TABLE:Tableau des themes`
        },
        providers: [importProvidersFrom(NgxsModule.forFeature([ThemeState]))],
        children: [
          {
            path: '',
            component: AdminThemeComponent,
            data: {
              breadcrumb: null
            }
          },
          {
            path: ':id',
            component: AdminThemeComponent,
            data: {
              breadcrumb: $localize`:@@WORKFLOW_TABLE:detail`
            }
          }
        ]
      }
    ]
  },
];
