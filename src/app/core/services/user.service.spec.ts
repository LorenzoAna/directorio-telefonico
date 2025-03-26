import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  // servicios y controladores
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Aseguramos que no hayan solicitudes HTTP pendientes después de cada prueba
  afterEach(() => {
    httpMock.verify();
  });

  it('userService es creado', () => {
    expect(service).toBeTruthy();
  });

  describe('#register', () => {
    it('register() debería devolver una respuesta positiva de insercción de usuario', () => {
      const baseUrl: string = 'http://localhost:3000/users';
      const formValue = {
        name: 'User1',
        phone: 123123123,
        role: 'ADMIN',
        password: '0000',
      };
      const mockResponse = { success: true };

      // Llamamos al servicio de registro y verificamos la respuesta
      service.register(formValue).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      // Esperamos que se haga una solicitud HTTP POST al URL del servicio
      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse); // Simulamos la respuesta exitosa
    });

    // manejar el error 500
    it('register() debe manejar el error de servidor en el registro', () => {
      const formValue = {
        name: 'User1',
        phone: 123123123,
        role: 'ADMIN',
        password: '0000',
      };
      const baseUrl: string = 'http://localhost:3000/users';

      const errorMessage = 'Error al registrar usuario';

      // Llamamos al servicio y verificamos que se maneje el error
      service.register(formValue).subscribe({
        next: () => fail('se esperaba un error, no datos'), // Fallamos si llega una respuesta exitosa

        error: (error) => {
          expect(error.message).toContain(errorMessage); // Verificamos que el mensaje de error esté correcto
        },
      });

      const req = httpMock.expectOne(baseUrl);
      req.flush('Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('#login', () => {
    it('login() debería devolver los datos del usuario en un inicio de sesión exitoso', () => {
      const formValue = { phone: 123123123, password: '1234' };
      const mockUser = [{ phone: 123123123, password: '1234' }];

      // Llamamos al servicio de login y verificamos la respuesta
      service.login(formValue).subscribe((user) => {
        expect(user).toEqual(mockUser[0]);
      });

      // interceptamos la solicitud GET
      const req = httpMock.expectOne(
        (request) =>
          request.url === service['baseUrl'] &&
          request.params.has('phone') &&
          request.params.has('password')
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });

    // manejar el error
    it('login() debería manejar el error cuando no se encuentra el usuario', () => {
      const formValue = { phone: 123123123, password: 'wrongpassword' };
      const baseUrl: string = 'http://localhost:3000/users';

      // Llamamos al servicio y verificamos que se maneje el error
      service.login(formValue).subscribe({
        next: () => fail('se esperaba un error, no datos'),
        error: (error) => {
          expect(error.message).toContain('Error al realizar el login'); // Verificamos que el mensaje de error esté correcto
        },
      });

      // Simulamos una respuesta vacía (usuario no encontrado)
      const req = httpMock.expectOne(
        (request) =>
          request.url === baseUrl &&
          request.params.has('phone') &&
          request.params.has('password')
      );
      req.flush([], { status: 404, statusText: 'Not Found' }); // Respuesta simulada de error 404
    });

    // manejar el error 500
    it('login() debería manejar el error de servidor en el login ', () => {
      const formValue = { phone: 123123123, password: '1234' };
      const baseUrl: string = 'http://localhost:3000/users';

      const errorMessage = 'Error al realizar el login';

      // Llamamos al servicio y verificamos que se maneje el error
      service.login(formValue).subscribe({
        next: () => fail('se esperaba un error, no datos'), // Fallamos si llega una respuesta exitosa

        error: (error) => {
          expect(error.message).toContain(errorMessage); // Verificamos que el mensaje de error esté correcto
        },
      });

      const req = httpMock.expectOne(
        (request) =>
          request.url === baseUrl &&
          request.params.has('phone') &&
          request.params.has('password')
      );
      req.flush('Error', { status: 500, statusText: 'Server Error' });
    });
  });
});
