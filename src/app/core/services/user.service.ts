import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'http://localhost:3000/users';
  private http = inject(HttpClient);
  constructor() {}

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
          // si no hay coincidencias
          throw new Error('Credenciales incorrectas');
        }
      }),
      catchError((error) =>
        this.handleError(error, 'Error al realizar el login')
      )
    );
  }

  // Manejo de errores
  private handleError(error: any, message: string): Observable<never> {
    console.error(message, error);
    return throwError(() => new Error(message));
  }
}
