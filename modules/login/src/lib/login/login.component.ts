import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MainPageTitleComponent } from '@te44-front/shared';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MainPageTitleComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent { }
