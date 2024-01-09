import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemandeTypeEnum, FormControlPresenterComponent, FormGroupPresenterComponent, IconUploaderComponent, SubThemeForm, SubThemeFormValue } from '@te44-front/shared';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Subject, Subscription, filter, tap } from 'rxjs';

@Component({
  selector: 'app-add-subtheme-form',
  standalone: true,
  imports: [
    ColorPickerModule,
    CommonModule,
    FormControlPresenterComponent,
    FormGroupPresenterComponent,
    IconUploaderComponent,
    InputTextModule,
    RadioButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-subtheme-form.component.html',
  styleUrl: './add-subtheme-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AddSubthemeFormComponent },
  ],
})
export class AddSubthemeFormComponent implements ControlValueAccessor, OnDestroy {

  destroy$ = new Subject<void>();

  formGroup: FormGroup<SubThemeForm> = this.formBuilder.group<SubThemeForm>({
    libelle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    icon: new FormControl<string>('', { nonNullable: true }),
    couleur: new FormControl<string>('', { nonNullable: true }),
    demandeType: new FormControl<DemandeTypeEnum>(DemandeTypeEnum.FORMULAIRE_SIMPLIFIE, { nonNullable: true }),
  })

  demandeTypes = [
    { key: DemandeTypeEnum.FORMULAIRE_SIMPLIFIE, value: $localize`:@@DEMANDE_SIMPLIFIEE:Demande simplifiée` },
    { key: DemandeTypeEnum.DEMANDE_TRAVAUX, value: $localize`:@@DEMANDE_TRAVAUX:Demande travaux` },
    { key: DemandeTypeEnum.DEMANDE_HORS_TRAVAUX, value: $localize`:@@DEMANDE_HORS_TRAVAUX:Demande hors travaux` },
    { key: DemandeTypeEnum.LIEN_EXTERNE, value: $localize`:@@LIEN_EXTERNE:Lien externe` },
  ]
  demandeType = DemandeTypeEnum;

  onTouched = () => { };
  onChangeSubs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.subscribeToDemandeTypeChange();
  }

  registerOnChange(fn: (arg: unknown) => void): void {
    const sub = this.formGroup.valueChanges.subscribe(fn);
    this.onChangeSubs.push(sub);
  }

  writeValue(value: SubThemeFormValue): void {
    if (value) {
      this.formGroup.patchValue({ ...value });
    }
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  subscribeToDemandeTypeChange(): void {
    this.formGroup.controls.demandeType.valueChanges.pipe(
      filter<DemandeTypeEnum | null>(Boolean),
      tap((value: DemandeTypeEnum) => this.updateForm(value))
    ).subscribe()
  }

  updateForm(value: DemandeTypeEnum): void {
    switch (value) {
      case DemandeTypeEnum.FORMULAIRE_SIMPLIFIE:
        this.formGroup.removeControl('accessibleATous');
        this.formGroup.removeControl('lienExterne');
        this.formGroup.removeControl('workflowId');
        this.formGroup.removeControl('workflowTravauxSimplifie');
        this.formGroup.addControl('mailReferent', new FormControl<string>('', { nonNullable: true }));
        break;
      case DemandeTypeEnum.DEMANDE_HORS_TRAVAUX:
      case DemandeTypeEnum.DEMANDE_TRAVAUX:
        this.formGroup.removeControl('lienExterne');
        this.formGroup.addControl('accessibleATous', new FormControl<boolean>(true, { nonNullable: true }));
        this.formGroup.addControl('mailReferent', new FormControl<string>('', { nonNullable: true }));
        this.formGroup.addControl('workflowId', new FormControl<number | null>(null, { nonNullable: true }));
        this.formGroup.addControl('workflowTravauxSimplifie', new FormControl<boolean>(false, { nonNullable: true }));
        break;
      case DemandeTypeEnum.LIEN_EXTERNE:
        this.formGroup.removeControl('accessibleATous');
        this.formGroup.removeControl('workflowId');
        this.formGroup.removeControl('mailReferent');
        this.formGroup.removeControl('workflowTravauxSimplifie');
        this.formGroup.addControl('lienExterne', new FormControl<string>('', { nonNullable: true }));
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

}
