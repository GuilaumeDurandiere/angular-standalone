import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalUpsertStepComponent } from './modal-upsert-step.component';

describe('ModalUpsertStepComponent', () => {
  let component: ModalUpsertStepComponent;
  let fixture: ComponentFixture<ModalUpsertStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpsertStepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalUpsertStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
