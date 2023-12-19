import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-workflow',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-workflow.component.html',
  styleUrl: './admin-workflow.component.less',
})
export class AdminWorkflowComponent { }
