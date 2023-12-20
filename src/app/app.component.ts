import { Component, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NavbarComponent } from '@te44-front/shared';

registerLocaleData(localeFr);

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR'}],
})
export class AppComponent {
  title = 'te44-front';
}
