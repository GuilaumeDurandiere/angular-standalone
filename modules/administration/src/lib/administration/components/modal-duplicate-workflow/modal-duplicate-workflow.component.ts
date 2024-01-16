import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DuplicateWorkflowFormValue, Workflow } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DuplicateWorkflowFormComponent } from '../duplicate-workflow-form/duplicate-workflow-form.component';
import { Store } from '@ngxs/store';

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
  valueForm: DuplicateWorkflowFormValue | undefined = undefined;

  constructor(private ref: DynamicDialogRef, private config:DynamicDialogConfig, private store: Store) {
    this.workflowName = this.config.data['workflowName'];
  }

  validate(formValue: DuplicateWorkflowFormValue | null): void {
    if(formValue?.libelle) {
      // this.sendDuplicateWorkflowRequest(this.workflowId, formValue.libelle).subscribe();
    } else {
      console.error("Some data was lost along the way. Can not send Duplicate Workflow Request.");
    }
    this.ref.close(formValue);
  }
}
