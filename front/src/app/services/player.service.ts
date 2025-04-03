import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CommonConstants } from '../shared/common.constants';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPlayers(name?: string, player_id?: string, lcm?: boolean): Observable<any[]> {
    let params = new HttpParams();

    if (name) params = params.set('name', name);
    if (player_id) params = params.set('player_id', player_id);
    if (lcm !== undefined) params = params.set('lcm', lcm.toString());

    return this.http.get<any[]>(`${this.apiUrl}${CommonConstants.URL.PLAYERS}`, { params });
  }

  getPlayersById(id: string, sortBy: string, sortOrder: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}${CommonConstants.URL.PLAYERS}/${id}?sortBy=${sortBy}&sortOrder=${sortOrder}`);
  }

  getPlayersAllDetails(name?: string, player_id?: string, lcm?: boolean, sortBy?: string, sortOrder?: string): Observable<any[]> {
    let params = new HttpParams();

    if (name) params = params.set('name', name);
    if (player_id) params = params.set('player_id', player_id);
    if (lcm !== undefined) params = params.set('lcm', lcm.toString());
    if (sortBy !== undefined) params = params.set('sortBy', sortBy.toString());
    if (sortOrder !== undefined) params = params.set('sortOrder', sortOrder.toString());

    return this.http.get<any[]>(`${this.apiUrl}${CommonConstants.URL.PLAYERSALLDETAILS}`, { params });
  }
}