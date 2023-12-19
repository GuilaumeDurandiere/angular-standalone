import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Workflow, WorkflowHttpService } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-workflow',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './admin-workflow.component.html',
  styleUrl: './admin-workflow.component.less',
})
export class AdminWorkflowComponent {
  workflows$: Observable<Workflow[]> = this.workflowService.getAll();

  constructor(private workflowService: WorkflowHttpService) { }

  onRowSelect(event: TableRowSelectEvent) {
    console.log(event);
  }
}
