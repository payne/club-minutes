import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardMinutes, MinutesIndex } from '../models/minutes.model';

@Injectable({
  providedIn: 'root',
})
export class MinutesData {
  constructor(private http: HttpClient) {}

  loadIndex(): Observable<MinutesIndex> {
    return this.http.get<MinutesIndex>('assets/data/index.json');
  }

  loadMinutes(filename: string): Observable<BoardMinutes> {
    return this.http.get<BoardMinutes>(`assets/data/${filename}`);
  }
}
