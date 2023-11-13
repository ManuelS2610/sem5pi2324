import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Robots } from '../interfaces/robots';

@Injectable({
  providedIn: 'root'
})
export class RobotsService {
  
private apiUrl = 'http://localhost:4000/api/robots';
HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  constructor(private http: HttpClient) { }

  createRobot (robot: any): Observable<any> {
    // Assuming 'robot' is a form group or form control
    return this.http.post(this.apiUrl, robot, this.HTTP_OPTIONS);
  }

  updateRobot (robot: any): Observable<any> {
    return this.http.put(this.apiUrl, robot, this.HTTP_OPTIONS);
  }

  getRobot (): Observable<Robots[]> {
    return this.http.get<Robots[]>(this.apiUrl,{observe: 'body',responseType:"json"});
  }


}
