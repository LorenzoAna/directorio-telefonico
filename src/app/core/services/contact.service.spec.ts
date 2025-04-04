import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ContactService } from './contact.service';
import { Contact } from 'src/app/shared/models/contact.model';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService],
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getContactsByUserId() Debe devolver los contactos del usuario registrado', () => {
    const baseUrl: string = 'http://localhost:3000';
    const mockContacts: Contact[] = [
      {
        id: '1',
        name: 'John',
        lastName: 'Doe',
        phone: '123456789',
        email: 'john@example.com',
        position: 'unknown',
      },
      {
        id: '2',
        name: 'Jane',
        lastName: 'Doe',
        phone: '123456789',
        email: 'jane@example.com',
        position: 'unknown',
      },
    ];
    const mockRelatios = [{ user_id: '123', contact_id: '1' }];
    // Llamamos al servicio de registro y verificamos la respuesta
    service.getContactsByUserId('123').subscribe((contacts) => {
      expect(contacts.length).toBe(1);
      expect(contacts).toEqual([mockContacts[0]]);
    });

    // Esperamos que se haga una solicitud HTTP al URL del servicio
    const req = httpMock.expectOne(`${baseUrl}/users_contacts?user_id=123`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRelatios);
    const req2 = httpMock.expectOne(`${baseUrl}/contacts?_sort=name`);
    expect(req2.request.method).toBe('GET');
    req2.flush(mockContacts);
  });

  it('addNewContact() Debe añadir un nuevo contacto y crear una relación', () => {
    const baseUrl: string = 'http://localhost:3000';
    const formValue = {
      name: 'Contact00',
      lastName: 'None',
      phone: '000000000',
      email: 'unknown',
      position: 'unknouwn',
    };
    const mockContact: Contact = {
      id: '1',
      name: 'John',
      lastName: 'Doe',
      phone: '123456789',
      email: 'john@example.com',
      position: 'unknown',
    };
    const userId = '123';
    // Llamamos al servicio de registro y verificamos la respuesta
    service.addNewContact(formValue, userId).subscribe((contact) => {
      expect(contact).toEqual(mockContact);
    });

    // Esperamos que se haga una solicitud HTTP al URL del servicio
    const req = httpMock.expectOne(
      `${baseUrl}/contacts?email=${formValue.email}`
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
    const req2 = httpMock.expectOne(`${baseUrl}/contacts`);
    expect(req2.request.method).toBe('POST');
    req2.flush(mockContact);
    const req3 = httpMock.expectOne(`${baseUrl}/users_contacts`);
    expect(req3.request.method).toBe('POST');
    req3.flush({ user_id: userId, contact_id: mockContact.id });
  });

  it('deleteContact() Debe borrar un contacto si no hay relaciones que existan', () => {
    const baseUrl: string = 'http://localhost:3000';
    const contactId = '1';
    const userId = '123';
    const mockRelation = [{ id: '1', user_id: userId, contact_id: contactId }];

    // Llamamos al servicio de registro y verificamos la respuesta
    service.deleteContact(contactId, userId).subscribe((response) => {
      expect(response).toEqual({});
    });

    // Esperamos que se haga una solicitud HTTP al URL del servicio
    const req = httpMock.expectOne(
      `${baseUrl}/users_contacts?contact_id=${contactId}&user_id=${userId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockRelation);

    const req2 = httpMock.expectOne(
      `${baseUrl}/users_contacts/${mockRelation[0].id}`
    );
    expect(req2.request.method).toBe('DELETE');
    req2.flush({});

    const req3 = httpMock.expectOne(
      `${baseUrl}/users_contacts?contact_id=${contactId}`
    );
    expect(req3.request.method).toBe('GET');
    req3.flush([]);

    const req4 = httpMock.expectOne(`${baseUrl}/contacts/${contactId}`);
    expect(req4.request.method).toBe('DELETE');
    req4.flush({});
  });

  it('getContactById() Debe devolver un contacto por su ID', () => {
    const baseUrl: string = 'http://localhost:3000';
    const contactId = '1';
    const mockContact: Contact = {
      id: '1',
      name: 'John',
      lastName: 'Doe',
      phone: '123456789',
      email: 'john@example.com',
      position: 'unknown',
    };
    // Llamamos al servicio de registro y verificamos la respuesta
    service.getContactById(contactId).subscribe((response) => {
      expect(response).toEqual(mockContact);
    });

    // Esperamos que se haga una solicitud HTTP al URL del servicio
    const req = httpMock.expectOne(`${baseUrl}/contacts/${contactId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockContact);
  });

  it('editContact() Debe editar un contacto', () => {
    const baseUrl: string = 'http://localhost:3000';
    const contactId = '1';
    const formValue = {
      name: 'John',
      lastName: 'Doe',
      phone: '123456789',
      email: 'john@example.com',
      position: 'unknown',
    };
    const mockContact: Contact = {
      id: '1',
      name: 'John',
      lastName: 'Doe',
      phone: '123456789',
      email: 'john@example.com',
      position: 'unknown',
    };
    // Llamamos al servicio de registro y verificamos la respuesta
    service.editContact(formValue, contactId).subscribe((response) => {
      expect(response).toEqual(mockContact);
    });

    // Esperamos que se haga una solicitud HTTP al URL del servicio
    const req = httpMock.expectOne(`${baseUrl}/contacts/${contactId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockContact);
  });
});
