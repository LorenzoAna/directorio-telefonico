import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  // tipo FormGroup es un formulario reactivo que nos permite realizar ciertas validaciones etc
  formulario: FormGroup;

  // Inyectamos el servicio UserService en el constructor
  constructor(private userService: UserService, private router: Router) {
    this.formulario = new FormGroup({
      name: new FormControl(),
      phone: new FormControl(),
      rol: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const formValue = this.formulario.value;

      // Llamamos al metodo del servicio para hacer POST
      this.userService.register(formValue).subscribe({
        next: (response) => {
          console.log('User creado con éxito', response);
          // Redirige al Dashboard en caso de éxito
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al crear usuario', error);
        },
        complete: () => {
          console.log('Proceso de registro completado');
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
