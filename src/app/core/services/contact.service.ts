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
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private defaultContact: Contact = {
    id: 0,
    name: '',
    lastName: '',
    phone: '',
    email: '',
    position: '',
  };

  /** GET: obtener todos los contactos */
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.url}/contacts`).pipe(
      tap((contacts) => console.log('Contactos recibidos:', contacts)), // Solo logea sin cambiar nada
      catchError(this.handleError<Contact[]>('getContacts', []))
    );
  }
  /** Función reutilizable para ordenar los contactos por un campo específico */
  sortContacts(
    contacts: Contact[],
    field: keyof Contact,
    order: 'asc' | 'desc' = 'asc'
  ): Contact[] {
    return contacts.sort((a, b) => {
      // Asegurarse de que el campo sea tratado como string o number
      const valueA = a[field];
      const valueB = b[field];
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        // Si son de diferentes tipos o algo inesperado
        return 0;
      }
    });
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
