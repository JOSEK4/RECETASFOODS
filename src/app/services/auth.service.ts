import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: Storage, private router: Router) {
    // Inicializa Ionic Storage
    this.storage.create();
  }

  // Método para verificar si el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    const userEmail = await this.storage.get('userEmail');
    const userPassword = await this.storage.get('userPassword');
    return !!(userEmail && userPassword); // Si ambos valores existen, está autenticado
  }

  // Método para obtener el correo del usuario (si está autenticado)
  async getUserEmail(): Promise<string | null> {
    return await this.storage.get('userEmail');
  }

  // Método para guardar la información del usuario después de iniciar sesión o registrarse
  async setUserCredentials(email: string, password: string): Promise<void> {
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();
    await this.storage.set('userEmail', email);
    await this.storage.set('userPassword', encryptedPassword);
  }

  // Método para cerrar sesión
  async logout(): Promise<void> {
    await this.storage.remove('userEmail');
    await this.storage.remove('userPassword');
    this.router.navigate(['/login']); // Redirige al login
  }

  // Método para obtener la contraseña encriptada
  async getUserPassword(): Promise<string | null> {
    return await this.storage.get('userPassword');
  }
}
