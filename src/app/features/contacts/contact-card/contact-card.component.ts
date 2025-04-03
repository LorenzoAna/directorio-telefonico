import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContactService } from 'src/app/core/services/contact.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Contact } from 'src/app/shared/models/contact.model';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent {
  @Input() contact: Contact = {} as Contact;

  @Output() contactDeleted = new EventEmitter<string>();

  onDelete(): void {
    this.contactDeleted.emit(this.contact.id);
  }
}
