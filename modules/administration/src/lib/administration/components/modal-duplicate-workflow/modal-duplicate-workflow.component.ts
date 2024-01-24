import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DuplicateWorkflowFormValue } from '@te44-front/shared';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DuplicateWorkflowFormComponent } from '../duplicate-workflow-form/duplicate-workflow-form.component';

@Component({
  selector: 'app-modal-duplicate-workflow',
  standalone: true,
  imports: [ DuplicateWorkflowFormComponent, CommonModule ],
  templateUrl: './modal-duplicate-workflow.component.html',
  styleUrl: './modal-duplicate-workflow.component.less',
})
export class ModalDuplicateWorkflowComponent {
  workflowName : string;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    this.workflowName = this.config.data['workflowName'];
  }

  validate(formValue: DuplicateWorkflowFormValue | null): void {
    if(formValue?.libelle) {
      this.ref.close(formValue);
    } else {
      this.ref.close();
      console.error("Some data was lost along the way. Can not send Duplicate Workflow Request.");
    }
  }
}
