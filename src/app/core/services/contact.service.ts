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
  /** Crear nuevo contacto y su relación */
  addNewContact(formValue: any, userId: string): Observable<Contact> {
    return this.http
      .get<Contact[]>(`${this.baseUrl}/contacts?email=${formValue.email}`)
      .pipe(
        switchMap((contacts) => {
          if (contacts.length > 0) {
            const contact = contacts[0];
            console.log(
              'Ya existe un contacto con ese email:',
              formValue.email
            );
            return this.checkUserContactRelation(userId, contact.id).pipe(
              switchMap((relationExists) => {
                if (relationExists) {
                  console.log('La relación ya existe:', relationExists);
                  return of(contact); //Convierte el valor contact en un observable que emite ese valor
                } else {
                  return this.createUserContactRelation(
                    userId,
                    contact.id
                  ).pipe(map(() => contact)); //asegura que el observable final emita el contacto, no la relación creada.
                }
              })
            );
          } else {
            return this.http
              .post<Contact>(`${this.baseUrl}/contacts`, formValue)
              .pipe(
                switchMap((newContact) => {
                  console.log('Contacto creado con éxito:', newContact);
                  return this.createUserContactRelation(
                    userId,
                    newContact.id
                  ).pipe(map(() => newContact));
                })
              );
          }
        }),
        catchError(this.handleError<any>('addNewContact', {}))
      );
  }
  private checkUserContactRelation(
    userId: string,
    contactId: string
  ): Observable<boolean> {
    return this.http
      .get<any[]>(
        `${this.baseUrl}/users_contacts?user_id=${userId}&contact_id=${contactId}`
      )
      .pipe(map((relations) => relations.length > 0));
  }

  /** Crear la relación user-contact */
  private createUserContactRelation(
    userId: string,
    contactId: string
  ): Observable<any> {
    const userContactRelation = {
      user_id: userId,
      contact_id: contactId,
    };
    return this.http
      .post<any>(`${this.baseUrl}/users_contacts`, userContactRelation)
      .pipe(
        tap((relacion) => console.log('Relacion creada con éxito:', relacion))
      );
  }
  /** Manejar los posibles errores */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /** Eliminar contacto*/
  /** Eliminar contacto y relación */
  deleteContact(contactId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/contacts/${contactId}`).pipe(
      switchMap(() => {
        // Primero, verifica si la relación existe
        return this.http
          .get<any[]>(`${this.baseUrl}/users_contacts?contact_id=${contactId}`)
          .pipe(
            switchMap((relations) => {
              if (relations.length > 0) {
                // Si la relación existe, elimina cada una de ellas
                const deleteRequests = relations.map((relation) =>
                  this.http.delete<any>(
                    `${this.baseUrl}/users_contacts/${relation.id}`
                  )
                );
                return forkJoin(deleteRequests);
              } else {
                // Si no hay relaciones, simplemente devuelve un observable vacío
                return of(null);
              }
            })
          );
      }),
      catchError(this.handleError<any>('deleteContact'))
    );
  }
}
