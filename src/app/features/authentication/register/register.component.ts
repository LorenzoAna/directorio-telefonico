import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  // tipo FormGroup es un formulario reactivo que nos permite realizar ciertas validaciones etc
  formulario: FormGroup;

  // Inyectamos el servicio AuthService en el constructor
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      name: new FormControl(),
      phone: new FormControl(),
      role: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const formValue = this.formulario.value;

      // Llamamos al metodo del servicio para hacer POST
      this.authService.register(formValue).subscribe({
        next: () => {
          // Redirige al Dashboard en caso de éxito
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al crear usuario', error);
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
