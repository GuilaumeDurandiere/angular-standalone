import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNewBusinessComponent } from './modal-new-business.component';

describe('ModalNewBusinessComponent', () => {
  let component: ModalNewBusinessComponent;
  let fixture: ComponentFixture<ModalNewBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewBusinessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalNewBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
