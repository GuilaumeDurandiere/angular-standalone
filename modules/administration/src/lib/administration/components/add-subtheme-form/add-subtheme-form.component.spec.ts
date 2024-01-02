import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSubthemeFormComponent } from './add-subtheme-form.component';

describe('AddSubthemeFormComponent', () => {
  let component: AddSubthemeFormComponent;
  let fixture: ComponentFixture<AddSubthemeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubthemeFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSubthemeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
