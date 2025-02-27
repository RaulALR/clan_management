import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CommonConstants } from '../shared/common.constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private authState = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}${CommonConstants.URL.LOGIN}`,
      { username, password },
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this.authState.next(true);
        this.router.navigate(['/']);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${CommonConstants.URL.LOGOUT}`, 
      {}, 
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this.authState.next(false);
        this.router.navigate(['/login']); // 🔄 Redirige a login
      })
    );
  }

  isLoggedIn(): boolean {
    return this.getUsernameFromCookie() !== null;
  }

  getUsernameFromCookie(): string | null {
    const name = document.cookie.split('; ').find(row => row.startsWith('username='));
    return name ? decodeURIComponent(name.split('=')[1]) : null;
  }

  getTokenFromCookie(): string | null {
    const token = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
    return token ? token.split('=')[1] : null;
  }

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }
}
