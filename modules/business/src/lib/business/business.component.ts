import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainPageTitleComponent } from '@te44-front/shared';

@Component({
  selector: 'app-business',
  standalone: true,
  imports: [CommonModule, MainPageTitleComponent],
  templateUrl: './business.component.html',
  styleUrl: './business.component.css',
})
export class BusinessComponent { }
