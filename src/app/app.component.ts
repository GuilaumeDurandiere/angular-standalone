import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Component, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@te44-front/shared';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

registerLocaleData(localeFr);

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent, ConfirmDialogModule, ToastModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
})
export class AppComponent {
  title = 'te44-front';
}
