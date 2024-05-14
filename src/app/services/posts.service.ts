import { getPostById } from './../post/state/posts.selector';
import { updatePost } from './../post/state/post.action';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root',
})
export class PostSService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get(
      `https://ngrx-counter-6b5b3-default-rtdb.firebaseio.com/posts.json`
    ).pipe(
      map(data=>{
        const posts : Post[] = [];
        for (let key in data){
          posts.push({...data[key], id :key})
        }
        return posts;
      })
    )
  }

  addPost(post : Post): Observable<Post> {
    return this.http.post<Post> (
      `https://ngrx-counter-6b5b3-default-rtdb.firebaseio.com/posts.json`, post
    )
  }

  updatePost (post:Post): Observable<Post> {
    const postData = {[post.id]: {title: post.title, description: post.description}}
  return this.http.patch<Post>(
    `https://ngrx-counter-6b5b3-default-rtdb.firebaseio.com/posts.json`, postData
  )
  }

  deletePost (id:string): Observable<any> {
  return this.http.delete<any>(
    `https://ngrx-counter-6b5b3-default-rtdb.firebaseio.com/posts/${id}.json`,
  )
  }
  getPostById (id:string): Observable<any> {
    return this.http.get<any>(
      `https://ngrx-counter-6b5b3-default-rtdb.firebaseio.com/posts/${id}.json`,
    )
    }
}
