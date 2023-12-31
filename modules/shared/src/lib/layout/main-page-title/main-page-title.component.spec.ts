import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageTitleComponent } from './main-page-title.component';

describe('MainPageTitleComponent', () => {
  let component: MainPageTitleComponent;
  let fixture: ComponentFixture<MainPageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
