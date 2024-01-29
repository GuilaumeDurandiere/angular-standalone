import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';
import { loggerInterceptor } from './core/interceptor/interceptor.service';

const PRIMENG_SERVICES = [ConfirmationService, DialogService, MessageService];
const PRIMENG_MODULES = [ConfirmDialogModule];

const MODULES = [
  PRIMENG_MODULES,
  BrowserModule,
  BrowserAnimationsModule,
  NgxsModule.forRoot([]),
  NgxsResetPluginModule.forRoot(),
  environment.plugins,
]

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(MODULES),
    PRIMENG_SERVICES,
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([loggerInterceptor])),
    provideAnimations(),
  ],
};
