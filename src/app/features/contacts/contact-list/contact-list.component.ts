import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ContactService } from 'src/app/core/services/contact.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent {
  public contacts$: Observable<any[]> = of([]);
  public userId: string | null = null;
  public userName: string | null = null;
  public userRole: string | null = null;
  public userDetails$;

  constructor(
    private contactService: ContactService,
    private userService: UserService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) {
    // Recuperar rol y segun este, recupera el userId
    this.userRole = this.storageService.getUserRole();
    if (this.userRole === 'USER') {
      this.userId = this.storageService.getUserId();
    }
    if (this.userRole === 'ADMIN') {
      this.userId = this.route.snapshot.paramMap.get('id');
      if (this.userId) {
        this.userDetails$ = this.userService.getUserById(this.userId);
      }
    }

    this.userName = this.storageService.getUserName();

    if (this.userId) {
      this.contacts$ = this.contactService.getContactsByUserId(this.userId);
    }
  }

  onOrderChange(order: any): void {
    if (this.userId) {
      this.contacts$ = this.contactService.getContactsByUserId(
        this.userId,
        order
      );
    }
  }
  onContactDeleted(contactId: string): void {
    if (this.userId) {
      this.contactService
        .deleteContact(contactId, this.userId)
        .subscribe(() => {
          console.log(contactId);
          if (this.userId) {
            this.contacts$ = this.contactService.getContactsByUserId(
              this.userId
            );
          }
        });
    }
  }
}
