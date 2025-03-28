import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs: bibliteca para programacion asincrona
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { Contact } from 'src/app/shared/models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private readonly http: HttpClient) {}

  private baseUrl = `http://localhost:3000`;

  getContactsByUserId(
    userId: string,
    order: keyof Contact = 'name'
  ): Observable<Contact[]> {
    const userContactRelation$ = this.http.get<any[]>(
      `${this.baseUrl}/users_contacts?user_id=${userId}`
    );
    const contacts$ = this.http.get<Contact[]>(
      `${this.baseUrl}/contacts?_sort=${order}`
    );
    return forkJoin({
      userContactRelation: userContactRelation$,
      contacts: contacts$,
    }).pipe(
      map((result) => {
        const contactIds = result.userContactRelation.map(
          (userContactRelation) => userContactRelation.contact_id
        );

        return result.contacts.filter((contact) =>
          contactIds.includes(contact.id)
        );
      }),
      catchError(this.handleError<Contact[]>('getContactsByUserId', []))
    );
  }

  addNewContact(formValue: any, userId: string): Observable<Contact> {
    return this.http
      .get<Contact[]>(`${this.baseUrl}/contacts?email=${formValue.email}`)
      .pipe(
        switchMap((contacts) => {
          if (contacts.length > 0) {
            // Si el contacto ya existe, devuelve el primer contacto encontrado
            console.log(
              'Ya existe un contacto con ese email:',
              formValue.email
            );

            return of(contacts[0]);
          } else {
            // Si no existe, crea uno nuevo
            return this.http.post<any>(`${this.baseUrl}/contacts`, formValue);
          }
        }),
        switchMap((contact) => {
          console.log('Contacto creado con éxito:', contact);
          const userContactRelation = {
            user_id: userId,
            contact_id: contact.id,
          };
          return this.http.post<any>(
            `${this.baseUrl}/users_contacts`,
            userContactRelation
          );
        }),
        tap((relacion) => console.log('Relacion creada con éxito:', relacion)),
        catchError(this.handleError<any>('addNewContact', {}))
      );
  }
  /** Manejar los posibles errores */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
