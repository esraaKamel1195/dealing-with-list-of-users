import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users_Api: string = 'https://jsonplaceholder.typicode.com/users/';

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.users_Api}`).pipe(
      catchError((error) => {
        return throwError(() => console.log(error));
      }),
      map((responseData) => {
        return responseData;
      })
    );
  }

  getUserById(id?: number): Observable<any> {
    return this.httpClient.get<any>(`${this.users_Api}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => console.log(error));
      }),
      map((responseData) => {
        return responseData;
      })
    );
  }
}
