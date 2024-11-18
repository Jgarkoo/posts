import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { Posts } from '../model/posts';


@Injectable({
  providedIn: 'root'
})
export class CartsService {

  apiURL: String;

  constructor(private http: HttpClient) {
    this.apiURL = `http://localhost:3000`;
  }

  logIn(data: Login): Observable<Login[]>{
    return this.http.post<Login[]>(`${this.apiURL}/logIn`, data)
  }

  addPosts(data: Posts): Observable <Posts[]>{
    return this.http.post<Posts[]>(`${this.apiURL}/posts`, data)
  }

  getPosts(): Observable<Posts[]>{
    return this.http.get<Posts[]>(`${this.apiURL}/posts`)
  }

  deletePost(id: string): Observable <Posts>{
    return this.http.delete<Posts>(`${this.apiURL}/posts/${id}`)
  }
  
  getSinglePost(id: string): Observable <Posts>{
    return this.http.get<Posts>(`${this.apiURL}/posts/${id}`)
  }

  updatePost(id: string, data: { title: string; body: string }): Observable<Posts> {
    return this.http.put<Posts>(`${this.apiURL}/posts/${id}`, data);
  }
  
}