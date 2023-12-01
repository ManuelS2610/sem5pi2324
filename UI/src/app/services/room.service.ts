import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Rooms } from '../interfaces/rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private API_URL = 'http://localhost:4000/api/rooms';

  HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  createRoom(room: any): Observable<any> {
    return this.http.post(this.API_URL, room, this.HTTP_OPTIONS);
  }


  updateRoom(room: any): Observable<any> {
    return this.http.put(this.API_URL, room, this.HTTP_OPTIONS);
  }

  
  getRoomByFloor(floor:any ): Observable<Rooms[]> {
    
    return this.http.get<Rooms[]>(this.API_URL+"/"+floor, { observe: 'body', responseType: 'json' });
  }

  getRooms(): Observable<Rooms[]> {
    return this.http.get<Rooms[]>(this.API_URL+"/allRooms/", { observe: 'body', responseType: 'json' });
  }


}
