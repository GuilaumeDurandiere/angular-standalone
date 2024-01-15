import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Theme, ThemeFormValue } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddThemeFormComponent } from '../add-theme-form/add-theme-form.component';

@Component({
  selector: 'app-modal-add-theme',
  standalone: true,
  imports: [
    AddThemeFormComponent,
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './modal-add-theme.component.html',
  styleUrl: './modal-add-theme.component.less',
})
export class ModalAddThemeComponent {

  valueForm: ThemeFormValue | undefined = undefined;
  theme: Theme | null = null;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    this.theme = this.config.data?.theme;
  }

  validate(formValue: ThemeFormValue | null): void {
    this.ref.close(formValue)
  }
}
