import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainPageTitleComponent } from '@te44-front/shared';
import { BreadcrumbComponent } from '../layout/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, RouterModule, MainPageTitleComponent, BreadcrumbComponent],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css',
})
export class AdministrationComponent {
}
