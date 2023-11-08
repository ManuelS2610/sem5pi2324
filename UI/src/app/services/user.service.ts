import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:4000/api/auth';

  constructor(private http : HttpClient) { }

  // Objective: Define the method to create a new user
    createUser (user: any): Observable<any> {
      return this.http.post(`${this.API_URL}/signup`, user);
    }

  // Objective: Define the method to login a user
    loginUser (user: any): Observable<any> {
      return this.http.post(`${this.API_URL}/signin`, user);
    }



  }



