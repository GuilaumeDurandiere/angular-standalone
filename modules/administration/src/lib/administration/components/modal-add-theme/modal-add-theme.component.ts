import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddThemeFormComponent } from '../add-theme-form/add-theme-form.component';

@Component({
  selector: 'app-modal-add-theme',
  standalone: true,
  imports: [
    AddThemeFormComponent,
    CommonModule,
  ],
  templateUrl: './modal-add-theme.component.html',
  styleUrl: './modal-add-theme.component.less',
})
export class ModalAddThemeComponent { }
