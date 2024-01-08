import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-form-group-presenter',
  imports: [CommonModule, ButtonModule],
  templateUrl: './form-group-presenter.component.html',
  styleUrls: ['./form-group-presenter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGroupPresenterComponent {
  @Input() title: string = '';
  @Input() background: 'white' | 'cyan' = 'white';
  @Input() collapsable = false;

  collapsed: boolean = true;
  collapseIcon = PrimeIcons.CHEVRON_RIGHT

  collapse(): void {
    this.collapsed = !this.collapsed;
    this.collapseIcon = this.toggleClass(this.collapsed);
  }

  toggleClass(collapsed: boolean): string {
    return collapsed ? PrimeIcons.CHEVRON_RIGHT : PrimeIcons.CHEVRON_DOWN;
  }
}
