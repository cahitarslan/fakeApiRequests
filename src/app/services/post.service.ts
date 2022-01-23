import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient
      .get(this.url)
      .pipe(retry(3), catchError(this.handleError));
  }

  createPost(post) {
    return this.httpClient.post(this.url, JSON.stringify(post));
  }

  updatePost(post) {
    return this.httpClient.put(this.url + '/' + post.id, JSON.stringify(post));
  }

  deletePost(post) {
    return this.httpClient
      .delete(this.url + 'a' + '/' + post.id)
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //client error
      console.log('Client error: ' + error.error.message);
    } else {
      //backend error
      console.log(
        `Backend error: status code: ${error.status} error: ${error.error}`
      );
    }
    return throwError('An unknown error occurred');
  }
}
