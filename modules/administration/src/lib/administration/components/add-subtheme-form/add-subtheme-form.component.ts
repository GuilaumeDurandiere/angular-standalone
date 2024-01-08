import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlPresenterComponent, FormGroupPresenterComponent, IconUploaderComponent, SubThemeForm, SubThemeFormValue } from '@te44-front/shared';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Subject, Subscription } from 'rxjs';

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
  })

  demandeTypes = [
    { key: 'S', value: $localize`:@@DEMANDE_SIMPLIFIEE:Demande simplifiée` },
    { key: 'T', value: $localize`:@@DEMANDE_TRAVAUX:Demande travaux` },
    { key: 'HT', value: $localize`:@@DEMANDE_HORS_TRAVAUX:Demande hors travaux` },
    { key: 'L', value: $localize`:@@LIEN_EXTERNE:Lien externe` },
  ]

  onTouched = () => { };
  onChangeSubs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) { }

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

}
