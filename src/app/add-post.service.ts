import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostPayload} from "./add-post/post-payload";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  private url = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  addPost(postPayload: PostPayload) {
    return this.httpClient.post(this.url + 'api/posts/new', postPayload);
  }

  getAllPosts(): Observable<Array<PostPayload>> {
    return this.httpClient.get<Array<PostPayload>>(this.url + 'api/posts/all');
  }

  getPost(permaLink: Number): Observable<PostPayload>{
    return this.httpClient.get<PostPayload>(this.url + 'api/posts/get/' + permaLink);
  }
}
