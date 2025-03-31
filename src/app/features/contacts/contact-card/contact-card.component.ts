import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/core/services/contact.service';
import { Contact } from 'src/app/shared/models/contact.model';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent {
  @Input() contact: Contact = {} as Contact;

  @Output() contactDeleted = new EventEmitter<string>();

  constructor(private contactService: ContactService) {}

  deleteContact(): void {
    this.contactService.deleteContact(this.contact.id).subscribe({
      next: () => {
        console.log('Contacto y relación eliminados con éxito');
        this.contactDeleted.emit(this.contact.id);
      },
      error: (error) => {
        console.error('Error al eliminar el contacto y la relación', error);
      },
    });
  }
}
