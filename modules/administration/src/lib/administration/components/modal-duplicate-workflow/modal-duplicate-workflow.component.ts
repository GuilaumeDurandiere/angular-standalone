import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DuplicateWorkflowFormValue, Workflow } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DuplicateWorkflowFormComponent } from '../duplicate-workflow-form/duplicate-workflow-form.component';
import { Observable } from 'rxjs/internal/Observable';
import { WorkflowHttpService } from '@te44-front/shared';

@Component({
  selector: 'app-modal-duplicate-workflow',
  standalone: true,
  imports: [
    DuplicateWorkflowFormComponent,
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './modal-duplicate-workflow.component.html',
  styleUrl: './modal-duplicate-workflow.component.less',
})
export class ModalDuplicateWorkflow {
  
  workflowName : string;
  workflowId : number;
  valueForm: DuplicateWorkflowFormValue | undefined = undefined;

  constructor(private ref: DynamicDialogRef, private config:DynamicDialogConfig, private workflowHttpService:WorkflowHttpService) {
    this.workflowId = this.config.data['workflowId'];
    this.workflowName = this.config.data['workflowName'];
  }

  validate(formValue: DuplicateWorkflowFormValue | null): void {
    console.log("Form was validated, now i can do stuff : " + this.workflowId);
    if(this.workflowId && formValue && formValue.libelle) {
      this.sendDuplicateWorkflowRequest(this.workflowId, formValue.libelle).subscribe();
    } else {
      console.error("Some data was lost along the way. Can not send Duplicate Workflow Request.");
    }
    this.ref.close(formValue);
  }

  sendDuplicateWorkflowRequest(id: number, label: string): Observable<Workflow> {
    return this.workflowHttpService.duplicate(id, label);
  }
}
