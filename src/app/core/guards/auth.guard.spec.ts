import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('AuthGuardService', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('Authservice', [
      'isUserLoggedIn',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  describe('AuthGuard', () => {
    it('Debe permitir la activación si el usuario está logueado', () => {
      authService.isUserLoggedIn.and.returnValue(true);
      expect(authGuard.canActivate()).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });
    it('No debe permitir la activación si el usuario no está logueado y redirige al login', () => {
      authService.isUserLoggedIn.and.returnValue(false);
      expect(authGuard.canActivate()).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
    it('Debe permitir la activación de los hijos si el usuario está logueado', () => {
      authService.isUserLoggedIn.and.returnValue(true);
      expect(authGuard.canActivateChild()).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });
    it('No debe permitir la activación de los hijos si el usuario no está logueado y redirige al login', () => {
      authService.isUserLoggedIn.and.returnValue(false);
      expect(authGuard.canActivateChild()).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
