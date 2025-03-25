import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/core/services/contact.service';
import { Contact } from 'src/app/shared/models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {

  public contacts$;

  constructor(private contactService: ContactService) {
    this.contacts$ = this.contactService.getAllContacts();
  }

  ngOnInit(): void {
    //this.getContacts(this.selectedOrder);
  }

  onOrderChange(order: any): void {
    this.contacts$ = this.contactService.getAllContacts(order);
  }
}
