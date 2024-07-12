import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User{
  username : string, 
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURl = "http://localhost:3000"

  constructor(private http : HttpClient) { 
  }

  signIn(username : string, password: string) : Observable<User>{
    const body = {
      username,
      password
    }
    return this.http.post<User>(`${this.apiURl}/auth/signin`, body);
  }

  login(username: string, password:string) : Observable<any>{
    const body = {
      username,
      password
    }

    return this.http.post<any>(`${this.apiURl}/auth/login`, body)
  }



  getUserData() : Observable<any>{
    const token = localStorage.getItem("JWT");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    const options= {headers}
    return this.http.get(`${this.apiURl}/auth`, options)
  }

}
