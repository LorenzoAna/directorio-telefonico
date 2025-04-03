import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  private baseUrl = `http://localhost:3000/users`;

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?role=USER`);
  }
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${userId}`);
  }
}
