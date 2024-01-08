import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminThemeDetailComponent } from './admin-theme-detail.component';

describe('AdminThemeDetailComponent', () => {
  let component: AdminThemeDetailComponent;
  let fixture: ComponentFixture<AdminThemeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminThemeDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminThemeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
