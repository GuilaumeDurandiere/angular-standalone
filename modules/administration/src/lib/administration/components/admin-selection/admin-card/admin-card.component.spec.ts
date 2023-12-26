import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministrationCardComponent } from './admin-card.component';

describe('AdministrationCardComponent', () => {
  let component: AdministrationCardComponent;
  let fixture: ComponentFixture<AdministrationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrationCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
