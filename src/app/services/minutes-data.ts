import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardMinutes } from '../models/minutes.model';

@Injectable({
  providedIn: 'root',
})
export class MinutesData {
  constructor(private http: HttpClient) {}

  loadMinutes(filename: string = 'assets/data/minutes.json'): Observable<BoardMinutes> {
    return this.http.get<BoardMinutes>(filename);
  }
}
