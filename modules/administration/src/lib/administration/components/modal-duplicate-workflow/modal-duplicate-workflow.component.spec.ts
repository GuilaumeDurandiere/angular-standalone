import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDuplicateWorkflow } from './modal-duplicate-workflow.component';

describe('ModalDuplicateWorkflow', () => {
  let component: ModalDuplicateWorkflow;
  let fixture: ComponentFixture<ModalDuplicateWorkflow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDuplicateWorkflow],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDuplicateWorkflow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
