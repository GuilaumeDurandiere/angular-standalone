import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSubstepComponent } from './admin-substep.component';

describe('AdminSubstepComponent', () => {
  let component: AdminSubstepComponent;
  let fixture: ComponentFixture<AdminSubstepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSubstepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSubstepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
