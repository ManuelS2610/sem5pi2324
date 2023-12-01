import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { SignUpComponent } from './sign-up.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { Users } from 'src/app/interfaces/users';
import {HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [MatTabsModule,HttpClientTestingModule], // Import necessary modules (like MatTabsModule)
      providers: [UserService] // Provide mock or actual service here
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService); // Get reference to the service
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createUser method with correct data', () => {
    const newUser: Users = {
      firstName: 'A',
      lastName: 'A',
      email: 'teste@teste.com',
      password: '10',
      role: 'admin'
    };

    spyOn(userService, 'createUser').and.returnValue(of(newUser));

    component.data = newUser; // Set component data to the new user

    component.createUser();

    expect(userService.createUser).toHaveBeenCalledWith(newUser);
  });

  

});



