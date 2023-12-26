import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-admin-card',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './admin-card.component.html',
  styleUrl: './admin-card.component.less',
})
export class AdministrationCardComponent {

  @Input() icon: string = 'pi-wrench';
  @Input() title: string = 'title';
  @Input() description: string = 'description';

}
