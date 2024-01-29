import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SubThemeFormValue, Subtheme } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddSubthemeFormComponent } from '../add-subtheme-form/add-subtheme-form.component';

@Component({
  selector: 'app-modal-add-subtheme',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    AddSubthemeFormComponent,
  ],
  templateUrl: './modal-add-subtheme.component.html',
  styleUrl: './modal-add-subtheme.component.less',
})
export class ModalAddSubthemeComponent {
  formGroup: FormGroup = this.formBuilder.group({
    soustheme: new FormControl<SubThemeFormValue>({ libelle: '', description: '', icone: '', couleur: '', refTypeOffreId: 1 }, { nonNullable: true })
  });
  valueForm: SubThemeFormValue | undefined = undefined;
  subtheme: Subtheme | null = this.config.data?.subtheme

  constructor(
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig) {
    if (this.subtheme) {
      this.formGroup.controls['soustheme'].patchValue(this.subtheme);
    }
  }

  validate(): void {
    this.ref.close(this.formGroup.controls['soustheme'].getRawValue())
  }

  cancel(): void {
    this.ref.close()
  }
}
