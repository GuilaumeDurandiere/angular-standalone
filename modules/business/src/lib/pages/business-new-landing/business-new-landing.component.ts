import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { MainPageTitleComponent, OfferTypeEnum, Subtheme } from '@te44-front/shared';
import { combineLatest } from 'rxjs';
import { BusinessStateActions } from '../../../state/actions/business.actions';
import { BusinessState } from '../../../state/business.state';
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
export class BusinessNewLandingComponent {

  viewModel$ = combineLatest({
    themes: this.store.select(BusinessState.getThemes),
    subthemes: this.store.select(BusinessState.getSubthemes),
  })

  constructor(
    private store: Store
  ) { }

  select(themeId: number): void {
    this.store.dispatch(new BusinessStateActions.getSubthemes(themeId))
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
        console.log('formulaire simplifié', subtheme.mailReferent)
        break;
      default:
        break;
    }
  }
}
