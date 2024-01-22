import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorsToMessagePipe } from '../../../pipes/errors-to-message.pipe';

@Component({
  standalone: true,
  selector: 'app-form-control-presenter',
  imports: [
    CommonModule,
    ErrorsToMessagePipe
  ],
  templateUrl: './form-control-presenter.component.html',
  styleUrls: ['./form-control-presenter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlPresenterComponent {
  @Input({ required: true }) control: AbstractControl | undefined;
  @Input() required = false;
  @Input() name = '';
  @Input() label = '';
}
