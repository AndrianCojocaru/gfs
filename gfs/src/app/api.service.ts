import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private link: string = 'https://gfs.andtrentini.it/ws';
  private token!: string;
  private refresh!: string;
  private isLoggedIn: boolean = false;
  private loginErrorSubj = new Subject<string>();
  loginError$ = this.loginErrorSubj.asObservable();
  private loginSubj = new Subject<boolean>();
  login$ = this.loginSubj.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  get IsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  login(credentials: any): any {
    try {
      this.http.post(this.link + '/login', credentials)
        .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
          this.loginErrorSubj.next('username o password sbagliati');
          return of();
        }))
        .subscribe((response: any) => {
          if (response) {
            console.log(response.data);
            this.token = response.data['access-token'];
            this.refresh = response.data['refresh-token'];
            this.isLoggedIn = true;
            this.router.navigate(['/main']);
            this.loginSubj.next(true);
          }
        });
    } catch (error) {
      this.loginErrorSubj.next('errore nell accesso al server');
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.loginSubj.next(false);
    this.router.navigate(['/login']);
  }

  loginFake(username: string, password: string): any {
    if (username === 'admin' && password === 'root') {
      this.isLoggedIn = true;
      this.router.navigate(['/main']);
      this.loginSubj.next(true);
    } else {
      this.loginErrorSubj.next('username o password sbagliati');
    }
  }

  refreshToken(): any {
    return this.http.post(this.link + '/token', { refresh: this.refresh });
  }

  get(endpoint: string): any {
    return this.http.get<any>(this.link + endpoint, { headers: new HttpHeaders().set('Authorization', 'bearer ' + this.token) });
  }

  post(endpoint: string, body: any): any {
    console.log(this.token);
    return this.http.post(this.link + endpoint, body, { headers: new HttpHeaders().set('Authorization', 'bearer ' + this.token) });
  }

  delete(endpoint: string, body?: any): any {
    if (body) {
      return this.http.delete(this.link + endpoint, { headers: new HttpHeaders().set('Authorization', 'bearer ' + this.token), body: body });
    } else {
      return this.http.delete(this.link + endpoint, { headers: new HttpHeaders().set('Authorization', 'bearer ' + this.token) });
    }
  }

  put(endpoint: string, body: any): any {
    return this.http.put(this.link + endpoint, body, { headers: new HttpHeaders().set('Authorization', 'bearer ' + this.token) });
  }
}