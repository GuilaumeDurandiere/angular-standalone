import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { addControlErrors } from '@te44-front/shared';
import { SharedModule } from 'primeng/api';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { compressImage } from '../../../helpers/images.helper';
import { Base64ToImagePipe } from '../../../pipes/base64-to-image.pipe';

@Component({
  selector: 'app-icon-uploader',
  standalone: true,
  imports: [
    Base64ToImagePipe,
    CommonModule,
    FileUploadModule,
    SharedModule,
  ],
  templateUrl: './icon-uploader.component.html',
  styleUrl: './icon-uploader.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: IconUploaderComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: IconUploaderComponent },
  ],
})
export class IconUploaderComponent implements ControlValueAccessor, OnDestroy, Validator {
  destroy$ = new Subject<void>();
  private iconSubject = new BehaviorSubject<string | null>(null);
  icon$ = this.iconSubject.asObservable();

  icon: string | undefined = undefined;

  formControl = new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })

  _onTouched = () => { };
  _onChangeSubs: Subscription[] = [];

  myUploader(event: FileUploadHandlerEvent) {
    const reader = new FileReader();

    reader.readAsDataURL(event.files[0]);

    reader.onloadend = (event: ProgressEvent<FileReader>) => {
      const image = event?.target?.result?.toString();
      if (image) {
        compressImage(image, 65, 65).then((res: string | undefined) => {
          if (res) {
            const compressedBase64 = res.toString().split('base64,')[1];
            this.iconSubject.next(compressedBase64);
            this.formControl.patchValue(compressedBase64);
          }
        });
      }
    }
  }

  writeValue(icon: string): void {
    if (icon) {
      this.iconSubject.next(icon)
      this.formControl.patchValue(icon);
    }
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  registerOnChange(fn: (arg: unknown) => void): void {
    const sub = this.formControl.valueChanges.subscribe(fn);
    this._onChangeSubs.push(sub);
  }

  validate(): ValidationErrors | null {
    if (this.formControl.valid) {
      return null;
    }

    let errors: ValidationErrors = {};
    errors = addControlErrors(errors, this.formControl, 'icon');


    return errors;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    for (const sub of this._onChangeSubs) {
      sub.unsubscribe();
    }
  }
}
