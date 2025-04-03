import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public userId: string | null = null;
  public userRole: string | null = null;
  constructor(
    private authService: AuthService,
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
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
