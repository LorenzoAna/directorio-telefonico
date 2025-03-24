import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/core/services/contact.service';
import { Contact } from 'src/app/shared/models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  constructor(private contactService: ContactService) {}
  contacts: Contact[] = [];
  selectedOrder: string = 'name'; // Valor por defecto

  ngOnInit(): void {
    this.getContacts(this.selectedOrder);
  }

  getContacts(order: any): void {
    this.contactService.getAllContacts().subscribe((contacts) => {
      const orderContacts = this.contactService.sortContacts(contacts, order);
      this.contacts = orderContacts;
    });
  }

  onOrderChange(order: any): void {
    this.selectedOrder = order;
    this.getContacts(this.selectedOrder);
  }
}
