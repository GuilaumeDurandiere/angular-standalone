import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormGroupPresenterComponent } from '@te44-front/shared';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-new-business-request',
  standalone: true,
  imports: [CommonModule, FileUploadModule, FormGroupPresenterComponent],
  templateUrl: './modal-new-business-request.component.html',
  styleUrl: './modal-new-business-request.component.less',
})

export class ModalNewBusinessRequestComponent implements OnDestroy {
  destroy$ = new Subject<void>();

  files: File[] = [];
  _onChangeSubs: Subscription[] = [];

  myUploader(event: FileUploadHandlerEvent) {
    this.files = event.files;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    for (const sub of this._onChangeSubs) {
      sub.unsubscribe();
    }
  }
}
