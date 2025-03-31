import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable, of } from 'rxjs';
import { ContactService } from 'src/app/core/services/contact.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  public contacts$: Observable<any[]> = of([]);
  public user: any;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private storageService: StorageService
  ) {
    //recuperar id
    const user = this.storageService.getUserId();
    if (user) {
      this.user = this.storageService.getUserId();
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
  onContactDeleted(): void {
    this.contacts$ = this.contactService.getContactsByUserId(this.user);
  }
}
