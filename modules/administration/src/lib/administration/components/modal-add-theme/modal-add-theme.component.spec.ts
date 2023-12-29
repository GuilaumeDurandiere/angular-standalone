import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAddThemeComponent } from './modal-add-theme.component';

describe('ModalAddThemeComponent', () => {
  let component: ModalAddThemeComponent;
  let fixture: ComponentFixture<ModalAddThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddThemeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAddThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
