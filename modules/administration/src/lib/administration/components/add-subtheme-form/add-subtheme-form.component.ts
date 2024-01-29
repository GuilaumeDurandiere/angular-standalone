import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { FormControlPresenterComponent, FormGroupPresenterComponent, IconUploaderComponent, OfferTypeEnum, SubThemeForm, Subtheme, addControlErrors } from '@te44-front/shared';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Subject, Subscription, filter, tap } from 'rxjs';
import { ThemeStateActions } from '../../../../state/actions/theme.actions';
import { ThemeState } from '../../../../state/theme.state';


@Component({
  selector: 'app-add-subtheme-form',
  standalone: true,
  imports: [
    ColorPickerModule,
    CommonModule,
    DropdownModule,
    FormControlPresenterComponent,
    FormGroupPresenterComponent,
    IconUploaderComponent,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-subtheme-form.component.html',
  styleUrl: './add-subtheme-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AddSubthemeFormComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: AddSubthemeFormComponent },
  ],
})
export class AddSubthemeFormComponent implements ControlValueAccessor, OnDestroy, Validator {

  workflow$ = this.store.select(ThemeState.getWorkflow).pipe(filter<{ libelle: string, id: number }[] | null>(Boolean));
  destroy$ = new Subject<void>();

  formGroup: FormGroup<SubThemeForm> = this.formBuilder.group<SubThemeForm>({
    libelle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    icone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    couleur: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    refTypeOffreId: new FormControl<OfferTypeEnum>(OfferTypeEnum.FORMULAIRE_SIMPLIFIE, { nonNullable: true, validators: [Validators.required] }),
  })

  offerTypes = [
    { key: OfferTypeEnum.FORMULAIRE_SIMPLIFIE, value: $localize`:@@DEMANDE_SIMPLIFIEE:Demande simplifiée` },
    { key: OfferTypeEnum.DEMANDE_TRAVAUX, value: $localize`:@@DEMANDE_TRAVAUX:Demande travaux` },
    { key: OfferTypeEnum.DEMANDE_HORS_TRAVAUX, value: $localize`:@@DEMANDE_HORS_TRAVAUX:Demande hors travaux` },
    { key: OfferTypeEnum.LIEN_EXTERNE, value: $localize`:@@LIEN_EXTERNE:Lien externe` },
  ]
  offerType = OfferTypeEnum;

  onTouched = () => { };
  onChangeSubs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.subscribeToDemandeTypeChange();
    this.store.dispatch(new ThemeStateActions.InitWorflow())
  }

  validate(): ValidationErrors | null {
    if (this.formGroup.valid) {
      return null;
    }

    let errors: ValidationErrors = {};
    errors = addControlErrors(errors, this.formGroup.controls.libelle, 'libelle');
    errors = addControlErrors(errors, this.formGroup.controls.mailReferent, 'mailReferent');
    errors = addControlErrors(errors, this.formGroup.controls.workflowId, 'workflowId');
    errors = addControlErrors(errors, this.formGroup.controls.lienExterne, 'lienExterne');

    return errors;
  }

  registerOnChange(fn: (arg: unknown) => void): void {
    const sub = this.formGroup.valueChanges.subscribe(fn);
    this.onChangeSubs.push(sub);
  }

  writeValue(value: Subtheme): void {
    console.log(value)
    if (value) {
      this.updateForm(value.refTypeOffre.id)
      this.formGroup.patchValue({ ...value, refTypeOffreId: value.refTypeOffre.id });
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
    this.formGroup.controls.refTypeOffreId.valueChanges.pipe(
      filter<OfferTypeEnum | null>(Boolean),
      tap((value: OfferTypeEnum) => this.updateForm(value))
    ).subscribe()
  }

  updateForm(value: OfferTypeEnum): void {
    switch (value) {
      case OfferTypeEnum.FORMULAIRE_SIMPLIFIE:
        this.formGroup.removeControl('accessibleATous');
        this.formGroup.removeControl('lienExterne');
        this.formGroup.removeControl('workflowId');
        this.formGroup.removeControl('workflowTravauxSimplifie');
        this.formGroup.addControl('mailReferent', new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }));
        break;
      case OfferTypeEnum.DEMANDE_HORS_TRAVAUX:
      case OfferTypeEnum.DEMANDE_TRAVAUX:
        this.formGroup.removeControl('lienExterne');
        this.formGroup.addControl('accessibleATous', new FormControl<boolean>(true, { nonNullable: true }));
        this.formGroup.addControl('mailReferent', new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }));
        this.formGroup.addControl('workflowId', new FormControl<number | null>(null, { nonNullable: true, validators: [Validators.required] }));
        this.formGroup.addControl('workflowTravauxSimplifie', new FormControl<boolean>(false, { nonNullable: true }));
        break;
      case OfferTypeEnum.LIEN_EXTERNE:
        this.formGroup.removeControl('accessibleATous');
        this.formGroup.removeControl('workflowId');
        this.formGroup.removeControl('mailReferent');
        this.formGroup.removeControl('workflowTravauxSimplifie');
        this.formGroup.addControl('lienExterne', new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }));
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
