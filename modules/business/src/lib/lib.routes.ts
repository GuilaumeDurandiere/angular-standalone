import { Route } from '@angular/router';
import { BusinessComponent } from './business/business.component';
import { BusinessNewLandingComponent } from './landing/business-new-landing/business-new-landing.component';

export const businessRoutes: Route[] = [
  { path: '', component: BusinessComponent },
  { path: 'new', component: BusinessNewLandingComponent },
];
