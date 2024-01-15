import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Base64ToImagePipe, BoolToStringPipe, ColumnCustom, PaginationData, PaginationDto, ServerPaginatedTableComponent, Theme, ThemeFormValue } from '@te44-front/shared';
import { ConfirmationService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { Observable, filter, take } from 'rxjs';
import { ThemeStateActions } from '../../../../state/actions/theme.actions';
import { ThemeState } from '../../../../state/theme.state';
import { ModalAddThemeComponent } from '../modal-add-theme/modal-add-theme.component';

@Component({
  selector: 'app-admin-theme',
  standalone: true,
  imports: [
    Base64ToImagePipe,
    BoolToStringPipe,
    ButtonModule,
    CommonModule,
    RouterModule,
    ServerPaginatedTableComponent,
    SharedModule,
    TableModule,
  ],
  templateUrl: './admin-theme.component.html',
  styleUrl: './admin-theme.component.less',
})
export class AdminThemeComponent {
  themes$: Observable<PaginationDto<Theme> | null> = this.store.select(ThemeState.getThemes);

  dialog: DynamicDialogRef | null = null;

  columns: ColumnCustom[] = [
    { field: 'icone', header: $localize`:@@ICON:Icone`, sort: false },
    { field: 'libelle', header: $localize`:@@THEME_NAME:Nom du thème`, sort: true },
    { field: 'description', header: $localize`:@@DESCRIPTION:Description`, sort: true },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: false },
  ]

  constructor(
    private confirmationService: ConfirmationService,
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

  openModalUpdateTheme(theme: Theme): void {
    this.dialog = this.dialogService.open(ModalAddThemeComponent, {
      header: $localize`:@@ADD_THEME_TITLE:Ajouter un theme`,
      height: '80%',
      width: '60%',
      maximizable: true,
      data: {
        theme,
      }
    });

    this.dialog.onClose
      .pipe(
        take(1),
        filter<ThemeFormValue | null>(Boolean),
      )
      .subscribe((formValue: ThemeFormValue) => {
        this.store.dispatch(new ThemeStateActions.Update(formValue, theme.id));
      });
  }

  deleteTheme(themeId: number, libelle: string): void {
    this.confirmationService.confirm({
      message: $localize`:@@CONFIRMATION_MESSAGE:Voulez-vous vraiment supprimer le sous-thème ${libelle} ?`,
      header: $localize`:@@CONFIRMATION_HEADER:Confirmation de suppression`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: $localize`:@@YES:Oui`,
      rejectLabel: $localize`:@@NO:Non`,
      dismissableMask: true,
      accept: () => {
        this.store.dispatch(new ThemeStateActions.DeleteTheme(themeId))
      }
    });
  }



}
