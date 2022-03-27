import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {JWTToken} from "../modelInterface/AccessToken";
import {User} from "../modelInterface/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private readonly loginUrl = 'http://localhost:8080/api/v1/login?';
  private readonly registerUrl = 'http://localhost:8080/api/v1/registration?';

  private readonly url = 'http://localhost:8080/api/v1/users/';

  constructor(private http: HttpClient) {
  }

  login(username:string, passwordHash:string ) : Observable<JWTToken> {
    return this.http.post<JWTToken>(this.loginUrl, {username, passwordHash}, this.httpOptions);
  }

  getUserByName(name: String): Observable<User> {
    return this.http.get<User>(this.url + name);
  }

  register(username: string, passwordHash: string): Observable<User> {
    return this.http.post<User>(this.registerUrl, {username, passwordHash});
  }
}
