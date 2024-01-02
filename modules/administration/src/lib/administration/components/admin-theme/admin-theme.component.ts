import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BoolToStringPipe, ColumnCustom, ServerPaginatedTableComponent, Workflow, WorkflowHttpService } from '@te44-front/shared';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Observable, map, of, share } from 'rxjs';
import { ModalAddThemeComponent } from '../modal-add-theme/modal-add-theme.component';

@Component({
  selector: 'app-admin-theme',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, ServerPaginatedTableComponent, SharedModule, BoolToStringPipe],
  templateUrl: './admin-theme.component.html',
  styleUrl: './admin-theme.component.less',
})
export class AdminThemeComponent {
  workflows$: Observable<Workflow[]> = of([])
  dialog: DynamicDialogRef | null = null;

  columns: ColumnCustom[] = [
    { field: 'name', header: $localize`:@@NAME:Nom`, sort: true },
    { field: 'offer', header: $localize`:@@RELATED_OFFERS:Offres liées`, sort: true },
    { field: 'active', header: $localize`:@@ACTIVE:Actif`, sort: true },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: true },
  ]

  constructor(
    private workflowService: WorkflowHttpService,
    private dialogService: DialogService,


  ) { }

  loadPageData(event: TableLazyLoadEvent): void {
    this.workflows$ = this.workflowService.getAll(event.first ?? 1, event.rows ?? 5).pipe(map((v: any) => v.value), share());
  }

  openModalAddTheme(): void {
    this.dialog = this.dialogService.open(ModalAddThemeComponent, {
      header: $localize`:@@ADD_THEME_TITLE:Ajouter un theme`,
      height: '80%',
      width: '80%',
      maximizable: true,
    });
  }

}
