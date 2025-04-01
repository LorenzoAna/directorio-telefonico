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
            //ya existe un user con ese email
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

  deleteContact(contactId: string, userId: string): Observable<any> {
    const getRelationsUrl = `${this.baseUrl}/users_contacts?contact_id=${contactId}&user_id=${userId}`;
    const deleteRelationUrl = (relationId: string) =>
      `${this.baseUrl}/users_contacts/${relationId}`;
    const checkRelationsUrl = `${this.baseUrl}/users_contacts?contact_id=${contactId}`;
    const deleteContactUrl = `${this.baseUrl}/contacts/${contactId}`;

    return this.http.get<any>(getRelationsUrl).pipe(
      switchMap((relations) => {
        const relationId = relations[0].id;
        // borramos la relacion contact-user
        return this.http.delete<any>(deleteRelationUrl(relationId));
      }),
      switchMap(() => this.http.get<any[]>(checkRelationsUrl)),
      switchMap((relations) => {
        if (relations.length === 0) {
          // Borramos el contacto si no tiene más relaciones
          return this.http.delete<any>(deleteContactUrl);
        } else {
          return of({
            message: 'El contacto tiene otras relaciones, no se eliminó',
          });
        }
      }),
      catchError(this.handleError<any>('deleteContact'))
    );
  }

  getContactById(contactId: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/contacts/${contactId}`);
  }

  editContact(formValue: any, contactId: string): Observable<Contact> {
    return this.http
      .put<Contact>(`${this.baseUrl}/contacts/${contactId}`, formValue)
      .pipe(catchError(this.handleError<any>('editContact', {})));
  }
}
