import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { ThemeState } from '../state/theme.state';
import { AdministrationComponent } from './administration/administration.component';
import { AdminSelectionComponent } from './administration/components/admin-selection/admin-selection.component';
import { AdminThemeComponent } from './administration/components/admin-theme/admin-theme.component';
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
      },
      {
        path: 'theme',
        data: {
          breadcrumb: $localize`:@@WORKFLOW_TABLE:Tableau des themes`
        },
        children: [
          {
            path: '',
            component: AdminThemeComponent,
            providers: [importProvidersFrom(NgxsModule.forFeature([ThemeState]))],
            data: {
              breadcrumb: null
            }
          },
          {
            path: ':id',
            component: AdminThemeComponent,
            providers: [importProvidersFrom(NgxsModule.forFeature([ThemeState]))],
            data: {
              breadcrumb: $localize`:@@WORKFLOW_TABLE:detail`
            }
          }
        ]
      }
    ]
  },
];
