import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ContactService } from 'src/app/core/services/contact.service';
import { StorageService } from 'src/app/core/services/storage.service';

import { AuthCredentials } from 'src/app/shared/models/auth-credentials.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  public contacts$: Observable<any[]> = of([]);
  public userId: string | null = null;
  public userName: string | null = null;

  constructor(
    private contactService: ContactService,
    private storageService: StorageService,
    private router: Router
  ) {
    // Recuperar id
    this.userId = this.storageService.getUserId();
    this.userName = this.storageService.getUserName();
    const userRole = this.storageService.getUserRole();

    if (this.userId) {
      this.contacts$ = this.contactService.getContactsByUserId(this.userId);
    }
  }

  ngOnInit(): void {}

  onOrderChange(order: any): void {
    if (this.userId) {
      this.contacts$ = this.contactService.getContactsByUserId(
        this.userId,
        order
      );
    }
  }
  onContactDeleted(): void {
    if (this.userId) {
      this.contacts$ = this.contactService.getContactsByUserId(this.userId);
    }
  }
}
