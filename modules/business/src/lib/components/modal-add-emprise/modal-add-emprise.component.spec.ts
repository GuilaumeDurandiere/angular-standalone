import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAddEmpriseComponent } from './modal-add-emprise.component';

describe('ModalAddEmpriseComponent', () => {
  let component: ModalAddEmpriseComponent;
  let fixture: ComponentFixture<ModalAddEmpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddEmpriseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAddEmpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
