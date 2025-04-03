import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ContactService } from 'src/app/core/services/contact.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Contact } from 'src/app/shared/models/contact.model';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent {
  public userRole: string | null = null;
  public userId: string | null = null;

  @Input() contact: Contact = {} as Contact;

  @Output() contactDeleted = new EventEmitter<string>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    // Recuperar rol y segun este, recupera el userId
    this.userRole = this.storageService.getUserRole();
    if (this.userRole === 'ADMIN') {
      this.userId = this.route.snapshot.paramMap.get('id');
    }
  }

  onDelete(): void {
    this.contactDeleted.emit(this.contact.id);
  }
}
