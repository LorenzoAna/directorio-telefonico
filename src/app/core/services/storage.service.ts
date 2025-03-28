import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private userId: string | null = null;
  private userRole: string | null = null;

  setUserId(id: string): void {
    //this.userId = id;

    localStorage.setItem('userId', id); // quitar esta linea
  }
  setUserRole(role: string): void {
    this.userRole = role;
  }
  getUserId(): string | null {
    //return this.userId;
    return localStorage.getItem('userId'); // quitar esta linea
  }
  getUserRole(): string | null {
    return this.userRole;
  }

  clearUserId(): void {
    this.userId = null;
  }
}
