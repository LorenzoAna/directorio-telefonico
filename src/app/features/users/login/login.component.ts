import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // tipo FormGroup es un formulario reactivo que nos permite realizar ciertas validaciones etc
  formulario: FormGroup;

  // Inyectamos el servicio UserService en el constructor
  constructor(private userService: UserService, private router: Router) {
    this.formulario = new FormGroup({
      phone: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const formValue = this.formulario.value;
      this.userService.login(formValue).subscribe({
        next: (response) => {
          console.log('User logueado con éxito', response);
          // Redirige al Dashboard en caso de éxito
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error al loguear usuario', error);
        },
        complete: () => {
          console.log('Proceso de login completado');
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
