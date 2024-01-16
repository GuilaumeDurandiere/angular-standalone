import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Step, Substep, SubstepFormValue, SubstepHttpService } from '@te44-front/shared';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Observable, of } from 'rxjs';
import { AddSubstepFormComponent } from '../add-substep-form/add-substep-form.component';

@Component({
  selector: 'app-admin-substep-modal',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, ReactiveFormsModule, ButtonModule, AddSubstepFormComponent],
  templateUrl: './admin-substep-modal.component.html',
  styleUrl: './admin-substep-modal.component.less',
  providers: [DialogService]
})
export class AdminSubstepModalComponent {
  step$: Observable<Step | null> = of(null);
  substep: Substep = {id: 0, libelle: ''};
  substepForm: FormGroup = this.formBuilder.group({
    sousEtape: new FormControl<SubstepFormValue>({ libelle: '', description: '' }, { nonNullable: true })
  });

  constructor(private formBuilder: FormBuilder, private substepService: SubstepHttpService, private dialogService: DialogService, private ref: DynamicDialogRef, public config: DynamicDialogConfig) {
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
    this.substepService.create({libelle: form.value.sousEtape.libelle, description: form.value.sousEtape.description, etapeId }).subscribe();
    this.closeDialog();
  }

  onUpdateSubmit(form: FormGroup): void {
    this.substepService.update({id: this.substep.id, libelle: form.value.sousEtape.libelle, description: form.value.sousEtape.description }).subscribe();
    this.closeDialog();
  }

  closeDialog() {
    //this.formValueEmitter.emit(null)
    this.ref.close();
  }
}
