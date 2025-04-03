import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setUserData(id: string, name: string, role: string) {
    this.setUserId(id);
    this.setUserName(name);
    this.setUserRole(role);
  }
  setUserId(id: string): void {
    localStorage.setItem('userId', id);
  }
  setUserName(name: string): void {
    localStorage.setItem('userName', name);
  }
  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
  getUserName(): string | null {
    return localStorage.getItem('userName');
  }
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  clearUserData(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  }
}
