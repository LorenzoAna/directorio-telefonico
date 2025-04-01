import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:3000/users';
  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) {}

  register(formValue: any): Observable<any> {
    return this.http
      .post<any>(this.baseUrl, formValue)
      .pipe(
        catchError((error) =>
          this.handleError(error, 'Error al registrar usuario')
        )
      );
  }

  login(formValue: any): Observable<any> {
    const params = {
      phone: formValue.phone,
      password: formValue.password,
    };

    // Realizamos una solicitud GET con un filtro por teléfono y contraseña
    return this.http.get<any[]>(this.baseUrl, { params }).pipe(
      map((users) => {
        if (users.length > 0) {
          return users[0];
        } else {
          throw new Error('Credenciales incorrectas');
        }
      }),
      catchError((error) =>
        this.handleError(error, 'Error al realizar el login')
      )
    );
  }

  isUserLoggedIn(): boolean {
    if (this.storageService.getUserId()) {
      return true;
    } else {
      return false;
    }
  }
  isAdmin(): boolean {
    if (this.storageService.getUserRole()==="ADMIN") {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.storageService.clearUserData();
  }

  // Manejo de errores
  private handleError(error: any, message: string): Observable<never> {
    console.error(message, error);
    return throwError(() => new Error(message));
  }
}
