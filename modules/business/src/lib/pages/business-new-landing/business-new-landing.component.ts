import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { MainPageTitleComponent, OfferTypeEnum, RequestFormValue, Subtheme } from '@te44-front/shared';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, combineLatest, filter, take } from 'rxjs';
import { BusinessStateActions } from '../../../state/actions/business.actions';
import { BusinessState } from '../../../state/business.state';
import { ModalNewBusinessRequestComponent } from '../../components/modal-new-business-request/modal-new-business-request.component';
import { ModalNewBusinessComponent } from '../../components/modal-new-business/modal-new-business.component';
import { SubthemeCardComponent } from '../../components/subtheme-card/subtheme-card.component';
import { ThemeCardComponent } from '../../components/theme-card/theme-card.component';

@Component({
  selector: 'app-business-new-landing',
  standalone: true,
  imports: [
    CommonModule,
    MainPageTitleComponent,
    SubthemeCardComponent,
    ThemeCardComponent,
  ],
  templateUrl: './business-new-landing.component.html',
  styleUrl: './business-new-landing.component.less',
})
export class BusinessNewLandingComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  viewModel$ = combineLatest({
    themes: this.store.select(BusinessState.getThemes),
    subthemes: this.store.select(BusinessState.getSubthemes),
  })

  dialog: DynamicDialogRef | null = null;

  constructor(
    private dialogService: DialogService,
    private store: Store
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.store.dispatch(new BusinessStateActions.Reset());
  }

  select(themeId: number): void {
    this.store.dispatch(new BusinessStateActions.GetSubthemes(themeId))
  }

  newBusiness(subtheme: Subtheme): void {
    switch (subtheme.refTypeOffre.id) {
      case OfferTypeEnum.LIEN_EXTERNE:
        this.openLink(subtheme?.lienExterne);
        break;
      case OfferTypeEnum.DEMANDE_HORS_TRAVAUX:
        if (!subtheme.accessible) {
          this.openModalNewBusiness(subtheme.libelle, subtheme.id);
        } else {
          this.openModalNewBusinessRequest(subtheme.libelle, true)
        }
        break;
      case OfferTypeEnum.DEMANDE_TRAVAUX:
        if (!subtheme.accessible) {
          this.openModalNewBusiness(subtheme.libelle, subtheme.id);
        } else {
          this.openModalNewBusinessRequest(subtheme.libelle)
        }
        break;
      case OfferTypeEnum.FORMULAIRE_SIMPLIFIE:
        this.openModalNewBusiness(subtheme.libelle, subtheme.id)
        break;
      default:
        break;
    }
  }

  openModalNewBusiness(subthemeName: string, subthemeId: number): void {
    this.dialog = this.dialogService.open(ModalNewBusinessComponent, {
      header: $localize`:@@NEW_BUSINESS:Faire une demande`,
      height: '80%',
      width: '60%',
      dismissableMask: true,
      closeOnEscape: false,
      data: {
        name: subthemeName
      },
    });

    this.dialog.onClose
      .pipe(
        take(1),
        filter<RequestFormValue | null>(Boolean),
      )
      .subscribe((value: RequestFormValue) =>
        this.store.dispatch(new BusinessStateActions.SendRequestForm(value, subthemeId)));
  }

  openModalNewBusinessRequest(subthemeName: string, isHorsTravaux: boolean = false): void {
    this.dialog = this.dialogService.open(ModalNewBusinessRequestComponent, {
      header: $localize`:@@NEW_BUSINESS_OF:Nouvelle demande : ${subthemeName}`,
      width: '60vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      dismissableMask: true,
      closeOnEscape: false,
      data: {
        isHorsTravaux
      },
    });

    this.dialog.onClose
      .pipe(
        take(1),
      )
      .subscribe((value: unknown) =>
        console.log(value)
      );
  }

  openLink(lienExterne: string | undefined): void {
    if (lienExterne) {
      window.open(lienExterne, '_blank');
    }
  }
}



