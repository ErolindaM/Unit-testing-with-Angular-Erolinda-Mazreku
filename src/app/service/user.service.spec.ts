import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { API_URL } from '../util/constant';
import { User } from '../interface/user';
import { MockUserList } from '../mock/user';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user list', () => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual(MockUserList); 
    });

    const req = httpMock.expectOne(`${API_URL}users`);
    expect(req.request.method).toBe('GET');
    req.flush(MockUserList);
  });

  it('should create user', () => {
    const newUser: User = MockUserList[0]; 

    const createUserSpy = spyOn(service, 'createUser').and.callThrough();

    service.createUser(newUser).subscribe(user => {
      expect(user).toEqual(newUser); 
    });

    const req = httpMock.expectOne(`${API_URL}users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(newUser);

    expect(createUserSpy).toHaveBeenCalled(); 
  });
});
