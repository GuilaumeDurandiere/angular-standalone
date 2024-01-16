import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSubstepModalComponent } from './admin-substep-modal.component';

describe('AdminSubstepModalComponent', () => {
  let component: AdminSubstepModalComponent;
  let fixture: ComponentFixture<AdminSubstepModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSubstepModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSubstepModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
