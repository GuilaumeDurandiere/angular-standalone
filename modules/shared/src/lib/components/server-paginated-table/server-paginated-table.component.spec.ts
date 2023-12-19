import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerPaginatedTableComponent } from './server-paginated-table.component';

describe('ServerPaginatedTableComponent', () => {
  let component: ServerPaginatedTableComponent;
  let fixture: ComponentFixture<ServerPaginatedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerPaginatedTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerPaginatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
