import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { BoolToStringPipe, ColumnCustom, PaginationData, ServerPaginatedTableComponent, ThemeFormValue } from '@te44-front/shared';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { filter, take } from 'rxjs';
import { ThemeStateActions } from '../../../../state/actions/theme.actions';
import { ThemeState } from '../../../../state/theme.state';
import { ModalAddThemeComponent } from '../modal-add-theme/modal-add-theme.component';

@Component({
  selector: 'app-admin-theme',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ServerPaginatedTableComponent,
    SharedModule,
    BoolToStringPipe,
  ],
  templateUrl: './admin-theme.component.html',
  styleUrl: './admin-theme.component.less',
})
export class AdminThemeComponent {
  theme$ = this.store.select(ThemeState.getTheme);

  dialog: DynamicDialogRef | null = null;

  columns: ColumnCustom[] = [
    { field: 'name', header: $localize`:@@NAME:Nom`, sort: true },
    { field: 'offer', header: $localize`:@@RELATED_OFFERS:Offres liées`, sort: true },
    { field: 'active', header: $localize`:@@ACTIVE:Actif`, sort: true },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: true },
  ]

  constructor(
    private dialogService: DialogService,
    private store: Store
  ) { }

  loadPageData(event: PaginationData): void {
    this.store.dispatch(new ThemeStateActions.LoadPageData(event));
  }

  openModalAddTheme(): void {
    this.dialog = this.dialogService.open(ModalAddThemeComponent, {
      header: $localize`:@@ADD_THEME_TITLE:Ajouter un theme`,
      height: '80%',
      width: '60%',
      maximizable: true,
    });

    this.dialog.onClose
      .pipe(
        take(1),
        filter<ThemeFormValue | null>(Boolean),
      )
      .subscribe((formValue: ThemeFormValue) => {
        this.store.dispatch(new ThemeStateActions.Create(formValue));
      });
  }

}
