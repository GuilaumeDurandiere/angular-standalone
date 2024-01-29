import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { stepResolver } from '../resolvers/step.resolver';
import { subthemeResolver } from '../resolvers/subtheme.resolver';
import { workflowResolver } from '../resolvers/workflow.resolver';
import { ThemeState } from '../state/theme.state';
import { WorkflowState } from '../state/workflow.state';
import { AdministrationComponent } from './administration/administration.component';
import { AdminNewWorkflowComponent } from './administration/components/admin-new-workflow/admin-new-workflow.component';
import { AdminSelectionComponent } from './administration/components/admin-selection/admin-selection.component';
import { AdminStepComponent } from './administration/components/admin-step/admin-step.component';
import { AdminSubstepComponent } from './administration/components/admin-substep/admin-substep.component';
import { AdminThemeDetailComponent } from './administration/components/admin-theme-detail/admin-theme-detail.component';
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
          breadcrumb: $localize`:@@WORKFLOW_TABLE:Tableau des workflows`
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
            path: 'nouveau',
            component: AdminNewWorkflowComponent,
            data: {
              breadcrumb: $localize`:@@CREATE_WORKFLOW:Créer un workflow`
            }
          },
          {
            path: ':id',
            data: {
              breadcrumb: 'Étapes'
            },
            children: [
              {
                path: '',
                component: AdminStepComponent,
                resolve: { workflowResolver },
                data: {
                  // breadcrumb: (data: any) => `${data.workflow.libelle}`,
                breadcrumb: null,
                },
              },
              {
                path: 'etape/:id',
                component: AdminSubstepComponent,
                resolve: { stepResolver },
                data: {
                  // breadcrumb: (data: any) => `${data.etape.libelle}`,
                  breadcrumb: 'Sous-étapes',
                },
              }
            ]
          }
        ]
      },
      {
        path: 'theme',
        data: {
          breadcrumb: $localize`:@@THEME_TABLE:Gestion des thèmes et des sous-thèmes du catalogue`
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
            component: AdminThemeDetailComponent,
            resolve: { subthemeResolver },
            data: {
              breadcrumb: $localize`:@@SUBTHEME_TABLE:Sous-thèmes`
            }
          }
        ]
      }
    ]
  },
];
