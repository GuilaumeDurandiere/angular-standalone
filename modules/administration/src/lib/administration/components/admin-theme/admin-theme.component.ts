import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BoolToStringPipe, ColumnCustom, ServerPaginatedTableComponent, Workflow, WorkflowHttpService } from '@te44-front/shared';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent, TableModule, TableRowSelectEvent } from 'primeng/table';
import { Observable } from 'rxjs';
import { ModalAddThemeComponent } from '../modal-add-theme/modal-add-theme.component';

@Component({
  selector: 'app-admin-theme',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, ServerPaginatedTableComponent, SharedModule, BoolToStringPipe],
  templateUrl: './admin-theme.component.html',
  styleUrl: './admin-theme.component.less',
})
export class AdminThemeComponent {
  workflows$: Observable<Workflow[]> = this.workflowService.getAll();
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

  onRowSelect(event: TableRowSelectEvent) {
    console.log(event);
  }

  loadPageData(event: TableLazyLoadEvent): void {
    console.log(event)
  }

  openModalAddTheme(): void {
    this.dialog = this.dialogService.open(ModalAddThemeComponent, {
      header: $localize`:@@ADD_THEME_TITLE:Ajouter un theme`,
    });
  }

}
