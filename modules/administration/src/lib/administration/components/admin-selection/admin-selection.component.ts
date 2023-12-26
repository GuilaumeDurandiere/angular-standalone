import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { AdministrationCardComponent } from './admin-card/admin-card.component';

@Component({
  selector: 'app-admin-selection',
  standalone: true,
  imports: [CommonModule, AdministrationCardComponent, RouterModule],
  templateUrl: './admin-selection.component.html',
  styleUrl: './admin-selection.component.less',
})
export class AdminSelectionComponent {
  primeIcons = PrimeIcons;

}
