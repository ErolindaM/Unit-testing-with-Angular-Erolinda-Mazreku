import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { By } from '@angular/platform-browser';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Name, email, phone, and comment inputs should be rendered', () => {
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('input[id="name"]')).toBeTruthy();
    expect(compiled.querySelector('input[id="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[id="phone"]')).toBeTruthy();
    expect(compiled.querySelector('textarea[id="comment"]')).toBeTruthy();
  });


  it('should check if button is disabled when form is invalid', () => {
  
    component.contactForm.get('name')?.setValue('Test test');

    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.disabled).toBe(true);
  });

  
  
});
