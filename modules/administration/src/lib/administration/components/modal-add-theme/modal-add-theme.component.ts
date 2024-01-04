import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
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

  constructor(private ref: DynamicDialogRef) { }

  cancel(): void {
    this.ref.close()
  }

  validate(): void {
    this.ref.close()
  }
}
