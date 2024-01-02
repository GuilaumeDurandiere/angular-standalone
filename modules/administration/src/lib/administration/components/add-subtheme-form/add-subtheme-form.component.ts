import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControlPresenterComponent, FormGroupPresenterComponent, SubThemeForm } from '@te44-front/shared';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-add-subtheme-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, FormControlPresenterComponent, FormGroupPresenterComponent],
  templateUrl: './add-subtheme-form.component.html',
  styleUrl: './add-subtheme-form.component.less',
})
export class AddSubthemeFormComponent {

  formGroup: FormGroup<SubThemeForm> = this.formBuilder.group<SubThemeForm>({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true }),
  })

  constructor(private formBuilder: FormBuilder, public controlContainer: ControlContainer) { }

}
