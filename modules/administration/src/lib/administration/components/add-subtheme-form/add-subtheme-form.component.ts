import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { FormControlPresenterComponent, FormGroupPresenterComponent, IconUploaderComponent, OfferTypeEnum, SubThemeForm, SubThemeFormValue } from '@te44-front/shared';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
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

  workflow$ = this.store.select(ThemeState.getWorkflow).pipe(filter<{ libelle: string, id: number }[] | null>(Boolean));
  destroy$ = new Subject<void>();

  formGroup: FormGroup<SubThemeForm> = this.formBuilder.group<SubThemeForm>({
    libelle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    icon: new FormControl<string>('', { nonNullable: true }),
    couleur: new FormControl<string>('', { nonNullable: true }),
    refTypeOffreId: new FormControl<OfferTypeEnum>(OfferTypeEnum.FORMULAIRE_SIMPLIFIE, { nonNullable: true }),
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
        this.formGroup.addControl('mailReferent', new FormControl<string>('', { nonNullable: true }));
        break;
      case OfferTypeEnum.DEMANDE_HORS_TRAVAUX:
      case OfferTypeEnum.DEMANDE_TRAVAUX:
        this.formGroup.removeControl('lienExterne');
        this.formGroup.addControl('accessibleATous', new FormControl<boolean>(true, { nonNullable: true }));
        this.formGroup.addControl('mailReferent', new FormControl<string>('', { nonNullable: true }));
        this.formGroup.addControl('workflowId', new FormControl<number | null>(null, { nonNullable: true }));
        this.formGroup.addControl('workflowTravauxSimplifie', new FormControl<boolean>(false, { nonNullable: true }));
        break;
      case OfferTypeEnum.LIEN_EXTERNE:
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
