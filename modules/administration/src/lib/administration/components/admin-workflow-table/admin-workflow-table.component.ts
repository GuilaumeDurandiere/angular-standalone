import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { Workflow, WorkflowHttpService } from '@te44-front/shared';

@Component({
  selector: 'app-admin-workflow-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './admin-workflow-table.component.html',
  styleUrl: './admin-workflow-table.component.less',
})
export class AdminWorkflowTableComponent implements OnInit {
  workflows: Workflow[] = [];

  constructor(private workflowService: WorkflowHttpService){}

  ngOnInit() {
    this.workflowService.getAll().subscribe(res => {
      this.workflows = res;
    })
  }

  onRowSelect(event: TableRowSelectEvent) {
    console.log(event);
  }
}
