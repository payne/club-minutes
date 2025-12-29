import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardMinutes, MinutesIndex, ClubsConfig } from '../models/minutes.model';

@Injectable({
  providedIn: 'root',
})
export class MinutesData {
  constructor(private http: HttpClient) {}

  loadClubsConfig(): Observable<ClubsConfig> {
    return this.http.get<ClubsConfig>('assets/config/clubs.json');
  }

  loadIndex(indexUrl: string): Observable<MinutesIndex> {
    return this.http.get<MinutesIndex>(indexUrl);
  }

  loadMinutes(url: string): Observable<BoardMinutes> {
    return this.http.get<BoardMinutes>(url);
  }
}
