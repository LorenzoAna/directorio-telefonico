import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() user: User = {} as User;
  @Output() userDeleted = new EventEmitter<string>();
  @Output() userContacts = new EventEmitter<string>();

  onDelete(): void {
    this.userDeleted.emit(this.user.id);
  }

  onUserContacts(): void {
    this.userContacts.emit(this.user.id);
  }
}
