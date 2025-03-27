import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/core/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  public contacts$;
  public user: any;

  constructor(private contactService: ContactService, private router: Router) {
    this.contacts$ = this.contactService.getAllContacts();
  }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      console.log('Usuario recuperado del local storage', this.user);
    } else {
      console.log('No hay usuario en el local storage');
      this.router.navigate(['/login']);
    }
  }

  onOrderChange(order: any): void {
    this.contacts$ = this.contactService.getAllContacts(order);
  }
}
