import { AuthenticationContext } from '@almond/sr-core/auth';
import { CommonModule } from '@angular/common';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { TableModule } from 'primeng/table';
import { of } from 'rxjs';

import { ClientPaginatedTableComponent } from './client-paginated-table.component';

describe('ClientPaginatedTableComponent', () => {
  let spectator: Spectator<ClientPaginatedTableComponent>;

  const createComponent = createComponentFactory({
    component: ClientPaginatedTableComponent,
    imports: [CommonModule, TableModule],
    providers: [
      mockProvider(AuthenticationContext, {
        getUserRows: () => of(5),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
