import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { RobotType } from '../interfaces/robotType';

@Injectable({
  providedIn: 'root'
})
export class RobotTypeService {

  private apiUrl = 'http://localhost:4000/api/robotTypes';
  HTTP_OPTIONS = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  createRobotType (robotType: any): Observable<any> {
    // Assuming 'robotType' is a form group or form control
    return this.http.post(this.apiUrl, robotType, this.HTTP_OPTIONS);
  }

  updateRobotType (robotType: any): Observable<any> {
    return this.http.put(this.apiUrl, robotType, this.HTTP_OPTIONS);
  }

  getRobotType (): Observable<RobotType[]> {
    return this.http.get<RobotType[]>(this.apiUrl,{observe: 'body',responseType:"json"});
  }
}
