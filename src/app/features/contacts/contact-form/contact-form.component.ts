import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/core/services/contact.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  // tipo FormGroup es un formulario reactivo que nos permite realizar ciertas validaciones etc
  formulario: FormGroup;
  mode: string = '';
  contactId: string | null = null;

  // Inyectamos el servicio AuthService en el constructor
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    //this.router.sta
    this.formulario = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      position: new FormControl(),
    });
  }
  ngOnInit(): void {
    this.mode = this.route.snapshot.data['mode'];
    this.contactId = this.route.snapshot.paramMap.get('id');

    if (this.mode === 'edit' && this.contactId) {
      this.contactService
        .getContactById(this.contactId)
        .subscribe((contact) => {
          this.formulario.patchValue(contact);
        });
    }
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const formValue = this.formulario.value;
      const userId = this.storageService.getUserId();
      if (this.mode === 'edit' && this.contactId) {
        console.log('editando');
        this.contactService.editContact(formValue, this.contactId).subscribe({
          next: (response) => {
            console.log('User editado con éxito', response);
            this.router.navigate(['/contacts']);
          },
          error: (error) => {
            console.error('Error al loguear usuario', error);
          },
        });
      }
      if (this.mode === 'create' && userId) {
        console.log('añadiendo');
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
