import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupPresenterComponent } from './form-group-presenter.component';

describe('FormGroupPresenterComponent', () => {
  let component: FormGroupPresenterComponent;
  let fixture: ComponentFixture<FormGroupPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGroupPresenterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormGroupPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
