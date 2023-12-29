import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-form-group-presenter',
  imports: [CommonModule],
  templateUrl: './form-group-presenter.component.html',
  styleUrls: ['./form-group-presenter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGroupPresenterComponent {
  @Input() title: string | null = null;
}
