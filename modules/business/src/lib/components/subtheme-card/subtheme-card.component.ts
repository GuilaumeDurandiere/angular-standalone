import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Base64ToImagePipe } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-subtheme-card',
  standalone: true,
  imports: [
    CommonModule,
    Base64ToImagePipe,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './subtheme-card.component.html',
  styleUrl: './subtheme-card.component.less',
})
export class SubthemeCardComponent {
  @Input() title: string | null = null;
  @Input() description: string | undefined = undefined;
  @Input() icon: string | null = null;

  @Output() newBusinessEmmiter: EventEmitter<void> = new EventEmitter();

  newBusiness(): void {
    this.newBusinessEmmiter.emit();
  }

}
