import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Buildings } from '../interfaces/buildings';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  private API_URL = 'http://localhost:4000/api/buildings';

  HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Objective: Define the method to create a new building
  createBuilding(building: any): Observable<any> {
    return this.http.post(this.API_URL, building, this.HTTP_OPTIONS);
  }

  // Objective: Define the method to update a building
  updateBuilding(building: any): Observable<any> {
    return this.http.put(this.API_URL, building, this.HTTP_OPTIONS);
  }

  // Objective: Define the method to get a building
  getBuilding(): Observable<Buildings[]> {
    return this.http.get<Buildings[]>(this.API_URL, { observe: 'body', responseType: 'json' });
  }
  getBuilding2 (minFloors: any,maxFloors:any): Observable<Buildings[]> {
    return this.http.get<Buildings[]>(this.API_URL+"/"+minFloors+"/"+maxFloors,{observe: 'body',responseType:"json"});
  }


}
