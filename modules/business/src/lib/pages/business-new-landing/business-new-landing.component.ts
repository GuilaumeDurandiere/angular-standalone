import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { MainPageTitleComponent, OfferTypeEnum, Subtheme } from '@te44-front/shared';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, combineLatest, filter, take } from 'rxjs';
import { BusinessStateActions } from '../../../state/actions/business.actions';
import { BusinessState } from '../../../state/business.state';
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
        console.log('lien externe', subtheme.lienExterne)
        break;
      case OfferTypeEnum.DEMANDE_HORS_TRAVAUX:
        console.log('demande hors travaux', subtheme.mailReferent)
        break;
      case OfferTypeEnum.DEMANDE_TRAVAUX:
        console.log('demande travaux', subtheme.mailReferent)
        break;
      case OfferTypeEnum.FORMULAIRE_SIMPLIFIE:
        this.openModalNewBusiness(subtheme.libelle)
        break;
      default:
        break;
    }
  }

  openModalNewBusiness(subthemeName: string): void {
    this.dialog = this.dialogService.open(ModalNewBusinessComponent, {
      header: $localize`:@@NEW_BUSINNESS:Faire une demande`,
      height: '80%',
      width: '60%',
      maximizable: true,
      dismissableMask: true,
      closeOnEscape: true,
      data: {
        name: subthemeName
      },
    });

    this.dialog.onClose
      .pipe(
        take(1),
        filter<string | null>(Boolean),
      )
      .subscribe(() => {

      });
  }
}
