import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainPageTitleComponent } from '@te44-front/shared';

@Component({
  selector: 'app-business-new-landing',
  standalone: true,
  imports: [CommonModule, MainPageTitleComponent],
  templateUrl: './business-new-landing.component.html',
  styleUrl: './business-new-landing.component.less',
})
export class BusinessNewLandingComponent { }
