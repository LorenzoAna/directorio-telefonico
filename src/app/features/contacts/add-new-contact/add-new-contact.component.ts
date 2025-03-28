import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/core/services/contact.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.scss'],
})
export class AddNewContactComponent {
  // tipo FormGroup es un formulario reactivo que nos permite realizar ciertas validaciones etc
  formulario: FormGroup;

  // Inyectamos el servicio AuthService en el constructor
  constructor(
    private contactService: ContactService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.formulario = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      position: new FormControl(),
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const formValue = this.formulario.value;
      const userId = this.storageService.getUserId();
      if (userId) {
        this.contactService.addNewContact(formValue, userId).subscribe({
          next: (response) => {
            console.log('User añadido con éxito', response);

            this.router.navigate(['/contacts']);
          },
          error: (error) => {
            console.error('Error al loguear usuario', error);
          },
        });
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}
