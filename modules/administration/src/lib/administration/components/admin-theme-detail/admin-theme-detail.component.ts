import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Base64ToImagePipe, ClientPaginatedTableComponent, ColumnCustom, SubThemeFormValue, Subtheme } from '@te44-front/shared';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { combineLatest, filter, take } from 'rxjs';
import { ThemeStateActions } from '../../../../state/actions/theme.actions';
import { ThemeState } from '../../../../state/theme.state';
import { ModalAddSubthemeComponent } from '../modal-add-subtheme/modal-add-subtheme.component';

@Component({
  selector: 'app-admin-theme-detail',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MessagesModule,
    ClientPaginatedTableComponent,
    Base64ToImagePipe,
    RouterModule,
    TooltipModule
  ],
  templateUrl: './admin-theme-detail.component.html',
  styleUrl: './admin-theme-detail.component.less',
})
export class AdminThemeDetailComponent {
  viewModel$ = combineLatest({
    theme: this.store.select(ThemeState.getTheme),
    simple: this.store.select(ThemeState.getSubthemeSimple),
    link: this.store.select(ThemeState.getSubthemeLink),
    excludingWork: this.store.select(ThemeState.getSubthemeExcludingWork),
    work: this.store.select(ThemeState.getSubthemeWork),
  })

  dialog: DynamicDialogRef | null = null;

  columnsSimple: ColumnCustom[] = [
    { field: 'couleur', header: $localize`:@@COLOR:Couleur`, sort: false },
    { field: 'icone', header: $localize`:@@ICON:Icône`, sort: false },
    { field: 'libelle', header: $localize`:@@THEME_NAME:Nom du thème`, sort: true },
    { field: 'description', header: $localize`:@@DESCRIPTION:Description`, sort: true },
    { field: 'mailReferent', header: $localize`:@@MAIL_REFERENT:Mail référent`, sort: true },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: false },
  ]

  columnsWork: ColumnCustom[] = [
    { field: 'couleur', header: $localize`:@@COLOR:Couleur`, sort: false },
    { field: 'icone', header: $localize`:@@ICON:Icône`, sort: false },
    { field: 'libelle', header: $localize`:@@THEME_NAME:Nom du thème`, sort: true },
    { field: 'description', header: $localize`:@@DESCRIPTION:Description`, sort: true },
    { field: 'mailReferent', header: $localize`:@@MAIL_REFERENT:Mail référent`, sort: true },
    { field: 'workflow.id', header: $localize`:@@WORKFLOW:Worklow lié`, sort: true },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: false },
  ]

  columnsExcludingWork: ColumnCustom[] = [
    { field: 'couleur', header: $localize`:@@COLOR:Couleur`, sort: false },
    { field: 'icone', header: $localize`:@@ICON:Icône`, sort: false },
    { field: 'libelle', header: $localize`:@@THEME_NAME:Nom du thème`, sort: true },
    { field: 'description', header: $localize`:@@DESCRIPTION:Description`, sort: true },
    { field: 'accessibleATous', header: $localize`:@@ACCESSIBLE_A_TOUS:Accessible à tous`, sort: true },
    { field: 'mailReferent', header: $localize`:@@MAIL_REFERENT:Mail référent`, sort: true },
    { field: 'workflowTravauxSimplifie', header: $localize`:@@WORKFLOW_SIMPLIFIEE:Workflow simplifié`, sort: true },
    { field: 'workflow.id', header: $localize`:@@WORKFLOW:Worklow lié`, sort: true },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: false },
  ]

  columnsLink: ColumnCustom[] = [
    { field: 'couleur', header: $localize`:@@COLOR:Couleur`, sort: false },
    { field: 'icone', header: $localize`:@@ICON:Icône`, sort: false },
    { field: 'libelle', header: $localize`:@@THEME_NAME:Nom du thème`, sort: true },
    { field: 'description', header: $localize`:@@DESCRIPTION:Description`, sort: true },
    { field: 'lienExterne', header: $localize`:@@EXTERNAL_LINK:Lien externe`, sort: true },
    { field: 'actions', header: $localize`:@@ACTIONS:Actions`, sort: false },
  ]

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private store: Store,
  ) { }

  openModalAddSubtheme(themeId: number | undefined, themeType?: string): void {
    if (!themeId) {
      return;
    }

    this.dialog = this.dialogService.open(ModalAddSubthemeComponent, {
      header: themeType ? $localize`:@@ADD_SUBTHEME_TITLE_OF:Ajouter un sous-thème ${themeType}` : $localize`:@@ADD_SUBTHEME_TITLE:Ajouter un sous-thème`,
      height: '80%',
      width: '60%',
      maximizable: true,
      dismissableMask: true,
      closeOnEscape: true,
    });

    this.dialog.onClose
      .pipe(
        take(1),
        filter<SubThemeFormValue | null>(Boolean),
      )
      .subscribe((formValue: SubThemeFormValue) => {
        this.store.dispatch(new ThemeStateActions.CreateSubtheme(formValue, themeId));
        this.messageService.add({ severity: 'success', summary: 'Ajout', detail: `Le sous-thème ${formValue.libelle} a été créé` })
      });
  }

  openModalUpdateSubtheme(subtheme: Subtheme): void {
    if (!subtheme) {
      return;
    }

    this.dialog = this.dialogService.open(ModalAddSubthemeComponent, {
      header: $localize`:@@MODIFY_SUBTHEME_TITLE:Modifier le sous-thème ${subtheme.libelle}`,
      height: '80%',
      width: '60%',
      maximizable: true,
      dismissableMask: true,
      closeOnEscape: true,
      data: {
        subtheme
      }
    });

    this.dialog.onClose
      .pipe(
        take(1),
        filter<SubThemeFormValue | null>(Boolean),
      )
      .subscribe((formValue: SubThemeFormValue) => {
        this.store.dispatch(new ThemeStateActions.UpdateSubtheme(formValue, subtheme.id));
        this.messageService.add({ severity: 'success', summary: 'Modification', detail: `Le sous-thème ${formValue.libelle} a été modifié` })
      });
  }

  deleteSubtheme(subthemeId: number, libelle: string): void {
    this.confirmationService.confirm({
      message: $localize`:@@CONFIRMATION_MESSAGE_SUBTHEME:Voulez-vous vraiment supprimer le sous-thème ${libelle} ?`,
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
        this.store.dispatch(new ThemeStateActions.DeleteSubtheme(subthemeId));
        this.messageService.add({ severity: 'success', summary: 'Suppression', detail: `Le sous-thème ${libelle} a été supprimé` })
      }
    });
  }

}
