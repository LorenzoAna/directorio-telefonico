import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  public users$: Observable<any[]> = of([]);
  public userName: string | null = '';
  public userId: string | null = '';
  constructor(
    private router: Router,
    private storageService: StorageService,
    private userService: UserService 
  ) {
    // Recuperar id
    this.userId = this.storageService.getUserId();
    this.userName = this.storageService.getUserName();
    const userRole = this.storageService.getUserRole();

    this.users$ = this.userService.getAllUsers();
  }

  onUserDeleted(userId: string): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.users$ = this.userService.getAllUsers(); // Actualizar la lista de usuarios después de eliminar
    });
  }

  onUserContacts(userId: string): void {
    this.router.navigate([`/users/${userId}/contacts`]);
  }
}
