import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Elevator } from '../interfaces/elevator';

@Injectable({
  providedIn: 'root'
})
export class ElevatorService {

  private API_URL = 'http://localhost:4000/api/elevators';

  HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Objective: Define the method to create a new elevator
  createElevator(elevator: Elevator): Observable<any> {
    console.log(elevator);
    return this.http.post(this.API_URL, elevator, this.HTTP_OPTIONS);
  }

  // Objective: Define the method to update a elevator
  updateElevator(elevator: any): Observable<any> {
    return this.http.put(this.API_URL, elevator, this.HTTP_OPTIONS);
  }

  // Objective: Define the method to get a elevator
  getElevator(buildingName: any): Observable<Elevator[]> {
    return this.http.get<Elevator[]>(this.API_URL+"/"+buildingName, { observe: 'body', responseType: 'json' });
  }

}
