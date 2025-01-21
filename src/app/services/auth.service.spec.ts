import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: Storage, private router: Router) {}

  // Método para verificar si el usuario está logueado
  async isAuthenticated(): Promise<boolean> {
    const userEmail = await this.storage.get('userEmail');
    const userPassword = await this.storage.get('userPassword');
    return !!(userEmail && userPassword); // Retorna true si existen ambos valores
  }

  // Método para cerrar sesión
  async logout() {
    await this.storage.remove('userEmail');
    await this.storage.remove('userPassword');
    this.router.navigate(['/login']);
  }
}
