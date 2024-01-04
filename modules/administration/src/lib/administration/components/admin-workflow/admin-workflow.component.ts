import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Workflow, WorkflowHttpService } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-workflow',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, TableModule],
  templateUrl: './admin-workflow.component.html',
  styleUrl: './admin-workflow.component.less',
})
export class AdminWorkflowComponent {
  workflows$: Observable<Workflow[]> = this.workflowService.getAll(15, 1);

  constructor(private router: Router, private workflowService: WorkflowHttpService){}

  onRowSelect(event: TableRowSelectEvent) {
    this.router.navigate([`/administration/workflow/${event.data.id}`]);
  }
}
