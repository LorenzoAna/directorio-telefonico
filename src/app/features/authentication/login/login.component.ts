import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // tipo FormGroup es un formulario reactivo que nos permite realizar ciertas validaciones etc
  formulario: FormGroup;

  // Inyectamos el servicio AuthService en el constructor
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private messageService: MessageService
  ) {
    this.formulario = new FormGroup({
      phone: new FormControl(),
      password: new FormControl(),
    });
  }
  ngOnInit(): void {
    // determinar el rol para marcar la ruta
    const isUserLoggedIn = this.authService.isUserLoggedIn();
    const role = this.storageService.getUserRole();
    if (isUserLoggedIn && role === 'ADMIN') {
      this.router.navigate(['/users']);
    } else if (isUserLoggedIn && role === 'USER') {
      this.router.navigate(['/contacts']);
    }
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const formValue = this.formulario.value;
      this.authService.login(formValue).subscribe({
        next: (response) => {
          this.storageService.setUserId(response.id);
          this.storageService.setUserName(response.name);
          this.storageService.setUserRole(response.role);
          if (response.role === 'ADMIN') {
            this.router.navigate(['/users']);
          } else {
            this.router.navigate(['/contacts']);
          }
        },
        error: (error) => {
          console.error('Error al loguear usuario', error);
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario Inválido',
        detail: 'Por favor, complete todos los campos requeridos.',
      });
    }
  }
}
