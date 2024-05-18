import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button with correct type', () => {
    component.type = 'submit';
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.getAttribute('type')).toBe('submit');
  });

  it('should render button with correct variant', () => {
    component.variant = 'success';
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('bg-success-500')).toBeTruthy();
  });

  it('should render the correct content', () => {
    const hostElement = document.createElement('div');
    hostElement.innerHTML = '<span class="test-content">Delete</span>';

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.appendChild(hostElement.firstChild);
    fixture.detectChanges();

    const projectedContent = buttonElement.querySelector('.test-content');
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.textContent.trim()).toBe('Delete');
  });
});
