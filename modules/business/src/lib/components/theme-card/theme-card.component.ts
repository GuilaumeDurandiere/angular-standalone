import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Base64ToImagePipe } from '@te44-front/shared';

@Component({
  selector: 'app-theme-card',
  standalone: true,
  imports: [
    CommonModule,
    Base64ToImagePipe,

  ],
  templateUrl: './theme-card.component.html',
  styleUrl: './theme-card.component.less',
})
export class ThemeCardComponent {
  @Input() title: string | null = null;
  @Input() icon: string | null = null;
}
