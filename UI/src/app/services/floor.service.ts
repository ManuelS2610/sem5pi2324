import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import {Floors}  from '../interfaces/floors';
import { Passages } from '../interfaces/passages';
import { Elevator } from '../interfaces/elevator';
import { Rooms } from '../interfaces/rooms';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  private API_URL = 'http://localhost:4000/api/floors';

  HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Objective: Define the method to create a new building
  createFloor(floor: any): Observable<any> {
    return this.http.post(this.API_URL, floor, this.HTTP_OPTIONS);
  }

  // Objective: Define the method to update a building
  updateFloor(floor: any): Observable<any> {
    return this.http.put(this.API_URL, floor, this.HTTP_OPTIONS);
  }

  // Objective: Define the method to get a building
  getFloors(): Observable<Floors[]> {
    return this.http.get<Floors[]>(this.API_URL + '/allFloors/', { observe: 'body', responseType: 'json' });
  }

  getFloorsByBuildingName(buildingName: string): Observable<Floors[]> {
    return this.http.get<Floors[]>(this.API_URL+'/' + buildingName, { observe: 'body', responseType: 'json' });
  }

  getFloorsWithPassages(): Observable<Floors[]> {
    return this.http.get<Floors[]>(this.API_URL + '/passages/', { observe: 'body', responseType: 'json' });
  }

  loadMap(floor: Floors,passage: Passages[], elevator:Elevator, room: Rooms[] ): Observable<any> {
    const body:
    {
      id: any,
      map: any,
      passages: Passages[],
      elevator: Elevator,
      rooms: Rooms[]
    } = {
      id: floor.id,
      map: floor.map,
      passages: passage,
      elevator: elevator,
      rooms: room
    };
    console.log(body);
    return this.http.patch(this.API_URL, body, this.HTTP_OPTIONS);
  }
}
