import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { businessResolver } from '../resolvers/business.resolver';
import { BusinessState } from '../state/business.state';
import { BusinessLandingComponent } from './pages/business-landing/business-landing.component';
import { BusinessNewLandingComponent } from './pages/business-new-landing/business-new-landing.component';

export const businessRoutes: Route[] = [
  { path: '', component: BusinessLandingComponent },

  {
    path: 'new',
    component: BusinessNewLandingComponent,
    providers: [importProvidersFrom(NgxsModule.forFeature([BusinessState]))],
    resolve: { businessResolver },
  },
];
