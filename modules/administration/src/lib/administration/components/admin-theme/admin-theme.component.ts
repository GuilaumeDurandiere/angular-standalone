import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Base64ToImagePipe, BoolToStringPipe, ColumnCustom, PaginationData, PaginationDto, ServerPaginatedTableComponent, Theme, ThemeFormValue } from '@te44-front/shared';
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
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
    TooltipModule,
  ],
  templateUrl: './admin-theme.component.html',
  styleUrl: './admin-theme.component.less',
})
export class AdminThemeComponent {
  themes$: Observable<PaginationDto<Theme> | null> = this.store.select(ThemeState.getThemes);

  dialog: DynamicDialogRef | null = null;

  columns: ColumnCustom[] = [
    { field: 'icone', header: $localize`:@@ICON:Icône`, sort: false },
    { field: 'nom', header: $localize`:@@THEME_NAME:Nom du thème`, sort: true },
    { field: 'description', header: $localize`:@@DESCRIPTION:Description`, sort: true },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: false },
  ]

  modalWidth = "60%";

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private store: Store
  ) {
    if (window.innerWidth <= 1280) {
      this.modalWidth = "85%";
    }
  }

  loadPageData(event: PaginationData): void {
    this.store.dispatch(new ThemeStateActions.LoadPageData(event));
  }

  openModalAddTheme(): void {
    this.dialog = this.dialogService.open(ModalAddThemeComponent, {
      header: $localize`:@@ADD_THEME_TITLE:Ajouter un thème`,
      height: '80%',
      width: this.modalWidth,
      dismissableMask: true,
      closeOnEscape: true,
    });

    this.dialog.onClose
      .pipe(
        take(1),
        filter<ThemeFormValue | null>(Boolean),
      )
      .subscribe((formValue: ThemeFormValue) => {
        this.store.dispatch(new ThemeStateActions.Create(formValue));
        this.messageService.add({ severity: 'success', summary: 'Modification', detail: `Le thème ${formValue.libelle} a été crée` })
      });
  }

  openModalUpdateTheme(theme: Theme): void {
    this.dialog = this.dialogService.open(ModalAddThemeComponent, {
      header: $localize`:@@UPDATE_THEME_TITLE:Modifier ${theme.libelle}`,
      height: '80%',
      width: this.modalWidth,
      dismissableMask: true,
      closeOnEscape: true,
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
        this.messageService.add({ severity: 'success', summary: 'Modification', detail: `Le thème ${theme.libelle} a été modifié` })
      });
  }

  deleteTheme(themeId: number, libelle: string): void {
    this.confirmationService.confirm({
      message: $localize`:@@CONFIRMATION_MESSAGE:Voulez-vous vraiment supprimer le thème ${libelle} ?`,
      header: $localize`:@@CONFIRMATION_HEADER:Confirmation de suppression`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: $localize`:@@YES:Oui`,
      rejectLabel: $localize`:@@NO:Non`,
      dismissableMask: true,
      closeOnEscape: true,
      accept: () => {
        this.store.dispatch(new ThemeStateActions.DeleteTheme(themeId))
        this.messageService.add({ severity: 'success', summary: 'Suppression', detail: `Le thème ${libelle} a été supprimé` })
      }
    });
  }
}
