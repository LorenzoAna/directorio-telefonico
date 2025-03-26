import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs: bibliteca para programacion asincrona
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Contact } from 'src/app/shared/models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private readonly http: HttpClient) {}

  private url = `http://localhost:3000`;

  private defaultContact: Contact = {
    id: '0',
    name: '',
    lastName: '',
    phone: '',
    email: '',
    position: '',
  };

  /** GET: obtener todos los contactos */
  getAllContacts(order: keyof Contact = 'name'): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.url}/contacts?_sort=${order}`).pipe(
      tap((contacts) => console.log('Contactos recibidos:', contacts)),
      catchError(this.handleError<Contact[]>('getContacts', []))
    );
  }

  /** GET: obtener los contactos asociados a un user */
  getContactsByUserId(userId: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.url}/users_contacts?user_id=${userId}`)
      .pipe(
        tap((_) => console.log('fetched user contacts')),
        catchError(this.handleError<any[]>('getContacts', []))
      );
  }

  /** GET: obtener los detalles de un contacto por su ID */
  getContactById(contactId: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.url}/contacts?id=${contactId}`).pipe(
      tap((contact) => console.log('Contact details:', contact)),
      catchError(
        this.handleError<Contact>('getContactsById', this.defaultContact)
      )
    );
  }

  /** Manejar los posibles errores */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(`${operation} failed: ${error.message}`); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
