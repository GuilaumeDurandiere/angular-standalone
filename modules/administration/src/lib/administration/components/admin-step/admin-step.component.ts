import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Workflow } from '@te44-front/shared';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { Observable, map, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-step',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, MessagesModule, AsyncPipe],
  templateUrl: './admin-step.component.html',
  styleUrl: './admin-step.component.less',
})
export class AdminStepComponent implements OnInit {
  workflow$: Observable<Workflow | null> = of(null);

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.workflow$ = this.route.data.pipe(map(({ workflow }) => workflow));
  }
}
