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
  ngOnInit(): void {
    this.getContacts();
  }
  getContacts(): void {
    this.contactService.getAllContacts().subscribe((contacts) => {
      const orderContacts = this.contactService.sortContacts(contacts, 'name');
      this.contacts = orderContacts;
    });
  }
}
