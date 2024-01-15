import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlPresenterComponent, FormGroupPresenterComponent, IconUploaderComponent, SubThemeForm, SubThemeFormValue, Theme, ThemeForm, ThemeFormValue } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, map } from 'rxjs';
import { AddSubthemeFormComponent } from '../add-subtheme-form/add-subtheme-form.component';

@Component({
  selector: 'app-add-theme-form',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormGroupPresenterComponent, FormControlPresenterComponent, InputTextModule, ReactiveFormsModule, AddSubthemeFormComponent, IconUploaderComponent],
  templateUrl: './add-theme-form.component.html',
  styleUrl: './add-theme-form.component.less',
})
export class AddThemeFormComponent implements OnChanges {

  @Input() theme: Theme | null = null;
  @Output() formValueEmitter = new EventEmitter<ThemeFormValue | null>();

  addTheme = true;

  formGroup: FormGroup<ThemeForm> = this.formBuilder.nonNullable.group<ThemeForm>({
    icone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    libelle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    sousThemes: new FormArray<FormGroup<SubThemeForm>>([]),
  })

  disabled$: Observable<boolean> = this.formGroup.statusChanges.pipe(
    map((status: string) => status !== 'VALID')
  );

  get formSubtheme(): FormArray<FormGroup<SubThemeForm>> {
    return this.formGroup.controls.sousThemes;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const theme: Theme | null = changes['theme']?.currentValue
    if (theme) {
      this.addTheme = false;
      this.formGroup.patchValue(theme);
    }

  }

  onAddSubTheme(): void {
    this.formGroup.controls.sousThemes.push(new FormControl<SubThemeFormValue>({ libelle: '', description: '', icone: '', couleur: '', refTypeOffreId: 1 }, { nonNullable: true }));
  }

  cancel(): void {
    this.formValueEmitter.emit(null)
  }

  validate(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.invalid) {
      console.log('error');
    } else {
      this.formValueEmitter.emit(this.formGroup.getRawValue());
    }
  }

}
