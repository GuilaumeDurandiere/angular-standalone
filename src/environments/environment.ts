// environment.ts
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

export const environment = {
  apiUrl: 'http://localhost:8080/api',
  production: false,
  plugins: [NgxsLoggerPluginModule.forRoot(), NgxsReduxDevtoolsPluginModule.forRoot()]
};