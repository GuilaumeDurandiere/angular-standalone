import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalUpdateWorkflowComponent } from './modal-update-workflow.component';

describe('ModalUpdateWorkflowComponent', () => {
  let component: ModalUpdateWorkflowComponent;
  let fixture: ComponentFixture<ModalUpdateWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpdateWorkflowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalUpdateWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
