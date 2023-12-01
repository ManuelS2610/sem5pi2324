import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { Users } from '../interfaces/users'; // Import the Users interface

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should send a POST request to create a user', () => {
    const mockUser: Users = {  // Use Users interface to define the mockUser
      firstName: 'A',
      lastName: 'A',
      email: 'teste@teste.com',
      password: '10',
      role: 'admin'
    };

    service.createUser(mockUser).subscribe(response => {
      expect(response).toBeTruthy(); // You can add specific checks based on your API response
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/auth/signup');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });
});
