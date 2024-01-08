import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconUploaderComponent } from './icon-uploader.component';

describe('IconUploaderComponent', () => {
  let component: IconUploaderComponent;
  let fixture: ComponentFixture<IconUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconUploaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
