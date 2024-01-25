import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessRequestForm, BusinessRequestFormValue, FormControlPresenterComponent } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { take } from 'rxjs';
import { ModalAddEmpriseComponent } from '../modal-add-emprise/modal-add-emprise.component';

@Component({
  selector: 'app-modal-new-business-request',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, ButtonModule, CalendarModule, InputTextareaModule, FormControlPresenterComponent],
  templateUrl: './modal-new-business-request.component.html',
  styleUrl: './modal-new-business-request.component.less',
})
export class ModalNewBusinessRequestComponent {

  formGroup: FormGroup<BusinessRequestForm> = this.formBuilder.group<BusinessRequestForm>({
    nom: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    prenom: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    email: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    poste: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    adresse: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    dateMiseEnService: new FormControl<Date>(new Date(), { validators: Validators.required, nonNullable: true }),
    nomSite: new FormControl<string | null>(''),
    description: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
  });

  fieldStyle = { 'width': '25rem' };
  isHorsTravaux: boolean = this.config.data.isHorsTravaux;

  points: { lat: number, lng: number }[] = [];

  dialog: DynamicDialogRef | null = null;


  constructor(
    private config: DynamicDialogConfig,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
  ) { }

  openModalAddEmprise(points: { lat: number, lng: number }[] | null): void {
    this.dialog = this.dialogService.open(ModalAddEmpriseComponent, {
      header: $localize`:@@ADD_THEME_TITLE:Ajouter un thème`,
      height: '80%',
      width: '60%',
      maximizable: true,
      closeOnEscape: false,
      data: {
        points,
      }
    });

    this.dialog.onClose
      .pipe(
        take(1),
      )
      .subscribe((formValue: { image: string, points: { lat: number, lng: number }[] }) => {
        this.points = formValue.points;
      });
  }

  cancel(): void {
    this.ref.close();
  }

  validate(): void {
    if (this.formGroup.valid) {
      const result: BusinessRequestFormValue = this.formGroup.getRawValue();
      this.ref.close(result);
    }
  }
}
