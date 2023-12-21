import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerPaginatedTableComponent } from '@te44-front/shared';
import { SharedModule } from 'primeng/api';

@Component({
  selector: 'app-admin-workflow',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, ServerPaginatedTableComponent],
  templateUrl: './admin-workflow.component.html',
  styleUrl: './admin-workflow.component.less',
})
export class AdminWorkflowComponent {

  data: { name: string; offer: string; state: true; }[] = []

  columns = [
    { field: 'name', header: `NAME`, sort: true },
    { field: 'offer', header: `OFFER`, sort: false },
    { field: 'state', header: `STATE`, sort: true },
    { field: 'action', header: `ACTION`, sort: false },
  ]

  load(): void {
    setTimeout(() => {
      this.data = [
        { name: 'workflow1', offer: 'offer1', state: true },
        { name: 'workflow2', offer: 'offer2', state: true },
        { name: 'workflow3', offer: 'offer3', state: true },
      ]
    }, 1000);
  }
}
