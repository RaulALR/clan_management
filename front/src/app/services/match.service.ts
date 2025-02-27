// match.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CommonConstants } from '../shared/common.constants';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  insertMatch(matchData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${CommonConstants.URL.MATCHES}`, matchData);
  }

  getMatches(sortBy: string, sortOrder: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${CommonConstants.URL.MATCHES}?sortBy=${sortBy}&sortOrder=${sortOrder}`);
  }

  deleteMatch(id: string) {
    return this.http.delete(`${this.apiUrl}${CommonConstants.URL.MATCHES}/${id}`);
  }

  getMatchesById(id: string, sortBy: string, sortOrder: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}${CommonConstants.URL.MATCHES}/${id}?sortBy=${sortBy}&sortOrder=${sortOrder}`);
  }
}
