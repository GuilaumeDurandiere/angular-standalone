import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessNewLandingComponent } from './business-new-landing.component';

describe('BusinessNewLandingComponent', () => {
  let component: BusinessNewLandingComponent;
  let fixture: ComponentFixture<BusinessNewLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessNewLandingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessNewLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
