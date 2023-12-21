import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminWorkflowTableComponent } from './admin-workflow-table.component';

describe('AdminWorkflowTableComponent', () => {
  let component: AdminWorkflowTableComponent;
  let fixture: ComponentFixture<AdminWorkflowTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminWorkflowTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminWorkflowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
