import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-icon-uploader',
  standalone: true,
  imports: [CommonModule, FileUploadModule, SharedModule],
  templateUrl: './icon-uploader.component.html',
  styleUrl: './icon-uploader.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: IconUploaderComponent },
  ],
})
export class IconUploaderComponent implements ControlValueAccessor, OnDestroy {
  destroy$ = new Subject<void>();
  icon: string | undefined = undefined;

  formControl = new FormControl<string>('', { nonNullable: true })

  _onTouched = () => { };
  _onChangeSubs: Subscription[] = [];

  myUploader(event: FileUploadHandlerEvent) {
    const reader = new FileReader();

    reader.readAsDataURL(event.files[0]);

    reader.onloadend = (event: ProgressEvent<FileReader>) => {
      if (event?.target?.result) {
        this.icon = event?.target?.result.toString()
        const base64 = this.icon.split('base64,')[1]
        this.formControl.patchValue(base64);
      }
    }
  }

  writeValue(icon: string): void {
    if (icon) {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    for (const sub of this._onChangeSubs) {
      sub.unsubscribe();
    }
  }
}
