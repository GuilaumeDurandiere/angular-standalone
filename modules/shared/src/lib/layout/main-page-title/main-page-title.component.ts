import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page-title.component.html',
  styleUrl: './main-page-title.component.less',
})
export class MainPageTitleComponent { }
