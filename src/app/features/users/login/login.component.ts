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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // tipo FormGroup es un formulario reactivo que nos permite realizar ciertas validaciones etc
  formulario: FormGroup;

  // Inyectamos el servicio AuthService en el constructor
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.formulario = new FormGroup({
      phone: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const formValue = this.formulario.value;
      this.authService.login(formValue).subscribe({
        next: (response) => {
          // Guardar usuario en el storage
          // this.storageService.setUserData(
          //   response.id,
          //   response.name,
          //   response.role
          // );
          this.storageService.setUserId(response.id);
          this.storageService.setUserName(response.name);
          this.storageService.setUserRole(response.role);

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error al loguear usuario', error);
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
