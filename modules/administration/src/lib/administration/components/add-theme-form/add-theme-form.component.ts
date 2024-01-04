import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlStatus, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlPresenterComponent, FormGroupPresenterComponent, SubThemeForm, SubThemeFormValue, ThemeForm, ThemeFormValue } from '@te44-front/shared';
import { PrimeIcons } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { map } from 'rxjs';
import { AddSubthemeFormComponent } from '../add-subtheme-form/add-subtheme-form.component';

@Component({
  selector: 'app-add-theme-form',
  standalone: true,
  imports: [CommonModule, FormGroupPresenterComponent, FormControlPresenterComponent, InputTextModule, ReactiveFormsModule, AddSubthemeFormComponent],
  templateUrl: './add-theme-form.component.html',
  styleUrl: './add-theme-form.component.less',
})
export class AddThemeFormComponent {

  @Output() valid = new EventEmitter<boolean>(false);
  @Output() formValue = new EventEmitter<ThemeFormValue>(false);


  formGroup: FormGroup<ThemeForm> = this.formBuilder.nonNullable.group<ThemeForm>({
    icon: new FormControl<PrimeIcons>(PrimeIcons.ALIGN_CENTER, { nonNullable: true, validators: [Validators.required] }),
    libelle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    status: new FormControl<boolean>(true, { nonNullable: true, validators: [Validators.required] }),
    subtheme: new FormArray<FormGroup<SubThemeForm>>([]),
  })

  get formSubtheme(): FormArray<FormGroup<SubThemeForm>> {
    return this.formGroup.controls.subtheme;
  }

  constructor(private formBuilder: FormBuilder) {
    this.subscribeToValueChange();
    this.subscribeToStatusChange();
  }

  onAddSubTheme(): void {
    this.formGroup.controls.subtheme.push(new FormControl<SubThemeFormValue>({ name: '', descritpion: '' }, { nonNullable: true }));
  }

  subscribeToValueChange(): void {
    this.formGroup.valueChanges.pipe(
    ).subscribe(() => this.formValue.emit(this.formGroup.getRawValue()));
  }

  subscribeToStatusChange(): void {
    this.formGroup.statusChanges.pipe(
      map((status: FormControlStatus) => status === 'VALID')
    ).subscribe((value: boolean) => this.valid.emit(value));
  }

}
