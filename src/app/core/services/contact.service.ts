import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs: bibliteca para programacion asincrona
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Contact } from 'src/app/shared/models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private readonly http: HttpClient) {}

  private url = `http://localhost:3000`;

  getContactsByUserId(
    userId: string,
    order: keyof Contact = 'name'
  ): Observable<Contact[]> {
    const userContactRelation$ = this.http.get<any[]>(
      `${this.url}/users_contacts?user_id=${userId}`
    );
    const contacts$ = this.http.get<Contact[]>(
      `${this.url}/contacts?_sort=${order}`
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

  /** Manejar los posibles errores */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
