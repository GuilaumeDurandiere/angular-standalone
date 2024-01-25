import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent, PRIMENG_CONFIG_TRANSLATION_FR } from '@te44-front/shared';
import { PrimeNGConfig } from 'primeng/api';
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
export class AppComponent implements OnInit {
  title = 'te44-front';

  constructor(private config: PrimeNGConfig) {}

  ngOnInit() {
    this.config.setTranslation(PRIMENG_CONFIG_TRANSLATION_FR);
  }
}
