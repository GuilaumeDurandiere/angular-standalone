import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TranslateModule } from '@ngx-translate/core';
import { FormControlPresenterComponent } from './form-control-presenter.component';

describe('FormControlPresenterComponent', () => {
  let spectator: Spectator<FormControlPresenterComponent>;

  const createComponent = createComponentFactory({
    component: FormControlPresenterComponent,
    imports: [TranslateModule.forRoot()],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
