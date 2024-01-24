import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminNewWorkflowComponent } from './admin-new-workflow.component';

describe('AdminNewWorkflowComponent', () => {
  let component: AdminNewWorkflowComponent;
  let fixture: ComponentFixture<AdminNewWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNewWorkflowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminNewWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
