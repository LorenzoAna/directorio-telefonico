import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable, of } from 'rxjs';
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
  public userCredentials: AuthCredentials | null = null;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private storageService: StorageService
  ) {
    // Recuperar datos de la navegacion
    const navigation = this.router.getCurrentNavigation(); //Esta línea obtiene la navegación actual,

    const state = navigation?.extras.state as {
      userCredentials: AuthCredentials;
    }; //accediendo al objeto de estado pasado durante la navegación y se está asegurando de que tenga la estructura esperada

    if (state && state.userCredentials) {
      this.userCredentials = state.userCredentials;
      this.contacts$ = this.contactService.getContactsByUserId(
        this.userCredentials.id
      );
    } else {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit(): void {}

  onOrderChange(order: any): void {
    if (this.userCredentials) {
      this.contacts$ = this.contactService.getContactsByUserId(
        this.userCredentials.id,
        order
      );
    }
  }
  onContactDeleted(): void {
    if (this.userCredentials) {
      this.contacts$ = this.contactService.getContactsByUserId(
        this.userCredentials.id
      );
    }
  }
}
