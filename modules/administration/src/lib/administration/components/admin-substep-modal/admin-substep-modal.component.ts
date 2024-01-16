import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Step, Substep, SubstepFormValue, SubstepHttpService } from '@te44-front/shared';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Observable, of } from 'rxjs';
import { AddSubstepFormComponent } from '../add-substep-form/add-substep-form.component';
import { Store } from '@ngxs/store';
import { WorkflowStateActions } from '../../../../state/actions/workflow.actions';

@Component({
  selector: 'app-admin-substep-modal',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, ReactiveFormsModule, ButtonModule, AddSubstepFormComponent],
  templateUrl: './admin-substep-modal.component.html',
  styleUrl: './admin-substep-modal.component.less',
})
export class AdminSubstepModalComponent {
  step$: Observable<Step | null> = of(null);
  substep: Substep = {id: 0, libelle: ''};
  substepForm: FormGroup = this.formBuilder.group({
    sousEtape: new FormControl<SubstepFormValue>({ libelle: '', description: '' }, { nonNullable: true })
  });

  constructor(private formBuilder: FormBuilder, private substepService: SubstepHttpService, private ref: DynamicDialogRef, public config: DynamicDialogConfig, private store: Store) {
    this.step$ = config.data.step$;
    this.subscribeToValueChange();
    if (config.data.substep) {
      this.substep = config.data.substep;
      this.substepForm.controls['sousEtape'].patchValue(config.data.substep);
    }
  }

  subscribeToValueChange(): void {
    this.substepForm.valueChanges.subscribe();
  }

  onCreateSubmit(form: FormGroup, etapeId: number): void {
    this.store.dispatch(new WorkflowStateActions.CreateSubstep({libelle: form.value.sousEtape.libelle, description: form.value.sousEtape.description }, etapeId));
    this.closeDialog();
  }

  onUpdateSubmit(form: FormGroup): void {
    this.store.dispatch(new WorkflowStateActions.UpdateSubstep({ id: this.substep.id, libelle: form.value.sousEtape.libelle, description: form.value.sousEtape.description }));
    this.closeDialog();
  }

  closeDialog() {
    this.ref.close();
  }
}
