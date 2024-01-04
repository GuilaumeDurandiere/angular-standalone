import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminStepModalComponent } from './admin-step-modal.component';

describe('AdminStepModalComponent', () => {
  let component: AdminStepModalComponent;
  let fixture: ComponentFixture<AdminStepModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStepModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStepModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
