import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessRequestForm, BusinessRequestFormValue, FormControlPresenterComponent, TypeToIconPipe } from '@te44-front/shared';
import { MessageService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { take } from 'rxjs';
import { ModalAddEmpriseComponent } from '../modal-add-emprise/modal-add-emprise.component';

@Component({
  selector: 'app-modal-new-business-request',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    CommonModule,
    FileUploadModule,
    FormControlPresenterComponent,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    SharedModule,
    TypeToIconPipe,
  ],
  templateUrl: './modal-new-business-request.component.html',
  styleUrl: './modal-new-business-request.component.less',
})
export class ModalNewBusinessRequestComponent {

  uploadedFiles: File[] = [];

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
    private messageService: MessageService,
    private ref: DynamicDialogRef,
  ) { }

  onUpload(event: FileUploadHandlerEvent) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Fichier Chargé' });
  }

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
      .subscribe((formValue: { image: Blob, points: { lat: number, lng: number }[] }) => {
        this.points = formValue.points;
        const myFile = new File([formValue.image], 'image.png')
        this.uploadedFiles.push(myFile);
        console.log(this.uploadedFiles)
      });
  }

  removeFile(index: number): void {
    this.uploadedFiles = this.uploadedFiles.slice(index, 1);
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
