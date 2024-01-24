import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Workflow, WorkflowFormValue } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpdateWorkflowFormComponent } from '../update-workflow-form/update-workflow-form.component';

@Component({
  selector: 'app-modal-update-workflow',
  standalone: true,
  imports: [CommonModule, ButtonModule, ReactiveFormsModule, UpdateWorkflowFormComponent],
  templateUrl: './modal-update-workflow.component.html',
  styleUrl: './modal-update-workflow.component.less',
})
export class ModalUpdateWorkflowComponent {
  formGroup: FormGroup = this.formBuilder.group({
    workflow: new FormControl<WorkflowFormValue>({ libelle: '', actif: true }, { nonNullable: true })
  });
  valueForm: WorkflowFormValue | undefined = undefined;
  workflow: Workflow | null = this.config.data?.workflow;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private formBuilder: FormBuilder) {
    if (this.workflow) {
      this.formGroup.controls['workflow'].patchValue(this.workflow);
    }
  }

  validate(): void {
    this.ref.close(this.formGroup.controls['workflow'].getRawValue());
  }

  cancel(): void {
    this.ref.close();
  }
}
