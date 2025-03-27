import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
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
    //recuperar id
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.router.navigate(['/login']);
      return;
    }

    this.contacts$ = this.contactService.getContactsByUserId(this.user);
  }

  ngOnInit(): void {}

  onOrderChange(order: any): void {
    this.contacts$ = this.contactService.getContactsByUserId(this.user, order);
  }
}
