import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRoute} from "@angular/router";
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MockUserList } from '../../mock/user';
import { of } from 'rxjs';
import { UserService } from '../../service/user.service';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: UserService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule,ReactiveFormsModule],
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
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    spyOn(userService, 'getUsers').and.returnValue(of(MockUserList));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the search input', () => {
    const searchInput = fixture.debugElement.query(By.css('input[type="search"]'));
    expect(searchInput).toBeTruthy();
  });

  it('should filter the user list based on search input', async () => {
    component.userList = MockUserList;
    component.originalUserList = MockUserList;
    fixture.detectChanges();

    const searchTerm = 'Leanne';
    component.searchControl.setValue(searchTerm);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.userList.length).toBe(1);
    expect(component.userList[0].name).toBe('Leanne Graham');
  });
 
  it('should fetch the user list', () => {
    component.getUserList();
    fixture.detectChanges();

    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.userList.length).toBe(2);
    expect(component.userList).toEqual(MockUserList);
  });

  it('should render the user list in the table', () => {
    component.userList = MockUserList;
    fixture.detectChanges();

    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tableRows.length).toBe(2); 

    const firstRowCells = tableRows[0].queryAll(By.css('td'));
    expect(firstRowCells[0].nativeElement.textContent).toContain('1'); 
    expect(firstRowCells[1].nativeElement.textContent).toContain('Leanne Graham');
    expect(firstRowCells[2].nativeElement.textContent).toContain('Sincere@april.biz');
    expect(firstRowCells[3].nativeElement.textContent).toContain('Romaguera-Crona');
    expect(firstRowCells[4].nativeElement.textContent).toContain('Kulas Light, Gwenborough 92998-3874');

    const secondRowCells = tableRows[1].queryAll(By.css('td'));
    expect(secondRowCells[0].nativeElement.textContent).toContain('2'); 
    expect(secondRowCells[1].nativeElement.textContent).toContain('Ervin Howell');
    expect(secondRowCells[2].nativeElement.textContent).toContain('Shanna@melissa.tv');
    expect(secondRowCells[3].nativeElement.textContent).toContain('Deckow-Crist');
    expect(secondRowCells[4].nativeElement.textContent).toContain('Victor Plains, Wisokyburgh 90566-7771');
  });
});
