import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubthemeCardComponent } from './subtheme-card.component';

describe('SubthemeCardComponent', () => {
  let component: SubthemeCardComponent;
  let fixture: ComponentFixture<SubthemeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubthemeCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubthemeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
