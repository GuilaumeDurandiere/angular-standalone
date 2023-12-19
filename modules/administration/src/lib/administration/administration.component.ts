import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainPageTitleComponent } from '@te44-front/shared';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, RouterModule, MainPageTitleComponent],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css',
})
export class AdministrationComponent { }
