import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrologService {

  constructor(private http: HttpClient) { }

  getBestPath(piso1: string, piso2: string): Observable<any> {
    return this.http.get("http://localhost:8000/api/bestPath?piso1=" + piso1 + "&piso2=" + piso2, { observe: 'body', responseType: 'json' })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  
}
