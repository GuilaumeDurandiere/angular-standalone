import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAddSubthemeComponent } from './modal-add-subtheme.component';

describe('ModalAddSubthemeComponent', () => {
  let component: ModalAddSubthemeComponent;
  let fixture: ComponentFixture<ModalAddSubthemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddSubthemeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAddSubthemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
