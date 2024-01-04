import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSubstepFormComponent } from './add-substep-form.component';

describe('AddSubstepFormComponent', () => {
  let component: AddSubstepFormComponent;
  let fixture: ComponentFixture<AddSubstepFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubstepFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSubstepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
