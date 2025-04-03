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
  private userRole: string | null = null;
  private userId: string | null = null;

  // Inyectamos el servicio AuthService en el constructor
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    // Recuperar rol y segun este, recupera el userId
    this.userRole = this.storageService.getUserRole();
    if (this.userRole === 'USER') {
      this.userId = this.storageService.getUserId();
    }
    if (this.userRole === 'ADMIN') {
      this.userId = this.route.snapshot.paramMap.get('id');
    }
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
    this.contactId = this.route.snapshot.paramMap.get('idContact');

    if (this.mode === 'edit' && this.contactId) {
      this.contactService
        .getContactById(this.contactId)
        .subscribe((contact) => {
          this.formulario.patchValue(contact);
        });
    }
  }

  public onSubmit(): void {
    if (this.formulario.valid) {
      const formValue = this.formulario.value;
      if (this.mode === 'edit' && this.contactId) {
        this.updateContact(formValue, this.contactId);
      } else if (this.mode === 'create' && this.userId) {
        this.createContact(formValue, this.userId);
      } else {
        console.log('Formulario inválido');
      }
    }
  }
  private createContact(formValue: any, userId: string): void {
    this.contactService.addNewContact(formValue, userId).subscribe({
      next: () => {
        const redirectUrl =
          this.userRole === 'ADMIN' ? `/users/${userId}/contacts` : '/contacts';
        this.router.navigate([redirectUrl]);
      },
      error: (error) => {
        console.error('Error al crear contacto', error);
      },
    });
  }

  private updateContact(formValue: any, contactId: string): void {
    this.contactService.editContact(formValue, contactId).subscribe({
      next: (response) => {
        console.log(this.userId);
        const redirectUrl =
          this.userRole === 'ADMIN'
            ? `/users/${this.userId}/contacts`
            : '/contacts';
        this.router.navigate([redirectUrl]);
      },
      error: (error) => {
        console.error('Error al editar contacto', error);
      },
    });
  }
}
