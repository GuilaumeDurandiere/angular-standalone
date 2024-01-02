import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlPresenterComponent, FormGroupPresenterComponent, SubThemeForm, ThemeForm } from '@te44-front/shared';
import { PrimeIcons } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { AddSubthemeFormComponent } from '../add-subtheme-form/add-subtheme-form.component';

@Component({
  selector: 'app-add-theme-form',
  standalone: true,
  imports: [CommonModule, FormGroupPresenterComponent, FormControlPresenterComponent, InputTextModule, ReactiveFormsModule, AddSubthemeFormComponent],
  templateUrl: './add-theme-form.component.html',
  styleUrl: './add-theme-form.component.less',
})
export class AddThemeFormComponent {

  formGroup: FormGroup<ThemeForm> = this.formBuilder.group<ThemeForm>({
    icon: new FormControl<PrimeIcons>(PrimeIcons.ALIGN_CENTER, { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
    status: new FormControl<boolean>(true, { nonNullable: true, validators: [Validators.required] }),
    subtheme: this.formBuilder.array([]),
  })

  get formSubtheme(): FormArray {
    return this.formGroup.controls.subtheme;
  }

  constructor(private formBuilder: FormBuilder) { }

  addSubTheme(): FormGroup<SubThemeForm> {
    return this.formBuilder.group<SubThemeForm>({
      name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl<string>('', { nonNullable: true }),
    })
  }

  onAddSubTheme(): void {
    this.formGroup.controls.subtheme.push(this.addSubTheme());
  }


}
