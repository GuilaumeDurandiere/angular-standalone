import { Route } from '@angular/router';
import { BusinessLandingComponent } from './landing/business-landing/business-landing.component';
import { BusinessNewLandingComponent } from './landing/business-new-landing/business-new-landing.component';

export const businessRoutes: Route[] = [
  { path: '', component: BusinessLandingComponent },
  { path: 'new', component: BusinessNewLandingComponent },
];
