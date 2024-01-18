import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalUpsertSubstepComponent } from './modal-upsert-substep.component';

describe('ModalUpsertSubstepComponent', () => {
  let component: ModalUpsertSubstepComponent;
  let fixture: ComponentFixture<ModalUpsertSubstepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpsertSubstepComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalUpsertSubstepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
