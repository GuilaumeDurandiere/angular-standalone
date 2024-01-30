import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNewBusinessRequestComponent } from './modal-new-business-request.component';
import {FileUpload, FileUploadModule} from 'primeng/primeng';

describe('ModalNewBusinessRequestComponent', () => {
  let component: ModalNewBusinessRequestComponent;
  let fixture: ComponentFixture<ModalNewBusinessRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewBusinessRequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalNewBusinessRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
