import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeFormValue } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'modal-duplicate-workflow',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './modal-duplicate-workflow.component.html',
  styleUrl: './modal-duplicate-workflow.component.less',
})
export class ModalDuplicateWorkflow {

  workflowName : string;
  workflowId : number;
  valueForm: ThemeFormValue | undefined = undefined;

  constructor(private ref: DynamicDialogRef, private config:DynamicDialogConfig ) {
    this.workflowId = this.config.data['workflowId'];
    this.workflowName = this.config.data['workflowName'];
  }

  validate(formValue: ThemeFormValue | null): void {
    this.ref.close(formValue)
  }


}
