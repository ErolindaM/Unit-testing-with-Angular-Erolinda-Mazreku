import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkComponent } from './link.component';
import {ActivatedRoute} from "@angular/router";
import { By } from '@angular/platform-browser';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get(): number {
                  return 6;
                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct type', () => {
    component.type = 'success';
    fixture.detectChanges();

    const linkElement = fixture.debugElement.query(By.css('a')).nativeElement;

    expect(linkElement.classList.contains('bg-success-500')).toBeTruthy();
    expect(linkElement.classList.contains('hover:bg-success-800')).toBeTruthy();
  });

  it('should render the correct content', () => {

    const hostElement = document.createElement('div');
    hostElement.innerHTML = '<span class="test-content">View</span>';

    const linkElement = fixture.debugElement.query(By.css('a')).nativeElement;
    linkElement.appendChild(hostElement.firstChild);
    fixture.detectChanges();

    const projectedContent = linkElement.querySelector('.test-content');
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.textContent.trim()).toBe('View');
  });
});
