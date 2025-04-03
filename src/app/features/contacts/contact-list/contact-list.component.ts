import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ContactService } from 'src/app/core/services/contact.service';
import { StorageService } from 'src/app/core/services/storage.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  public contacts$: Observable<any[]> = of([]);
  public userId: string | null = null;
  public userName: string | null = null;
  public userRole: string | null = null;

  constructor(
    private contactService: ContactService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Recuperar rol y segun este, recupera el userId
    this.userRole = this.storageService.getUserRole();
    if (this.userRole === 'USER') {
      this.userId = this.storageService.getUserId();
    }
    if (this.userRole === 'ADMIN') {
      this.route.paramMap.subscribe((params) => {
        this.userId = params.get('id');
      });
    }
    this.userName = this.storageService.getUserName();

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
