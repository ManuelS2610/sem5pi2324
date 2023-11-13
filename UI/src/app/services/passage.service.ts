import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap,of } from 'rxjs';
import { Passages } from '../interfaces/passages';
import { PASSAGES } from '../mock-passages';

@Injectable({
  providedIn: 'root'
})
export class PassageService {
  private apiUrl = 'http://localhost:4000/api/passage';
  HTTP_OPTIONS = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http : HttpClient) { }

  createPassage (passage: any): Observable<Passages> {
    // Assuming 'passage' is a form group or form control
    return this.http.post(this.apiUrl, passage, this.HTTP_OPTIONS);
  }

  updatePassage (passage: any): Observable<any> {
    return this.http.put(this.apiUrl, passage, this.HTTP_OPTIONS);
  }
  getPassage (building1: any,building2:any): Observable<Passages[]> {
    return this.http.get<Passages[]>(this.apiUrl+"/"+building1+"/"+building2,{observe: 'body',responseType:"json"});
  }
  get(): Observable<Passages[]> {
    const passage= of(PASSAGES);
    return passage;
  }
}
