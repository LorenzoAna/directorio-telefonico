import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuthCredentials } from 'src/app/shared/models/auth-credentials.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public userCredentials: AuthCredentials | null = null;

  constructor(private router: Router, private storageService: StorageService) {
    // Recuperar id
    const userId = this.storageService.getUserId();
    const userName = this.storageService.getUserName();
    const userRole = this.storageService.getUserRole();

    if (userId && userName && userRole) {
      this.userCredentials = { id: userId, name: userName, role: userRole };
      if (userRole === 'USER') {
        console.log('redirigir');
        this.router.navigate(['/contacts'], {
          state: { userCredentials: this.userCredentials },
        });
      }
    } else {
      this.router.navigate(['/login']);
      return;
    }
  }
}
