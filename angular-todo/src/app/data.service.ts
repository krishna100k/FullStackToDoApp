import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Todo{
  id : string,
  title:string,
  description : string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  title : string = "";
  description : string = "";

  apiUrl : string = "https://ca71e88f4d474f54ae6f.free.beeceptor.com/api/users/"
  constructor(private http:HttpClient) { }

  postTodo(title : string, description : string) : Observable<Todo>{
    const body = {
      id : Math.floor(Math.random() * 100000),
      title : title,
      description : description
    }
    return this.http.post<Todo>(this.apiUrl, body);
  }
}
