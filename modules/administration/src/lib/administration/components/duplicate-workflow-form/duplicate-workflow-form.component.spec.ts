import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DuplicateWorkflowFormComponent } from './duplicate-workflow-form.component';

describe('AddThemeFormComponent', () => {
  let component: DuplicateWorkflowFormComponent;
  let fixture: ComponentFixture<DuplicateWorkflowFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuplicateWorkflowFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DuplicateWorkflowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
