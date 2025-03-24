import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/shared/models/contact.model';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent {
  @Input() contact: Contact = {} as Contact;
  
  // genera el avatar con las iniciales de usuario
  getAvatarUrl(name: string, lastName: string): string {
    return `https://ui-avatars.com/api/?name=${name}+${lastName}&background=0D8ABC&color=fff&size=128`;
  }
}
