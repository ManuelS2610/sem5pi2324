import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:4000/api/auth';

  HTTP_OPTIONS = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { }

  // Objective: Define the method to create a new user
    createUser (user: any): Observable<any> {
      return this.http.post(this.API_URL + '/signup', user, this.HTTP_OPTIONS);
    }

  // Objective: Define the method to login a user
    loginUser (user: any): Observable<any> {
      return this.http.post(`${this.API_URL}/signin`, user);
    }

    submitApplication(firstName: string, lastName: string, email: string, role: string) {
      console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}, role: ${role}`);
      alert('Application submitted!');
    }
   
    



  }



