import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false); // Estado de autenticación

  constructor() {}

  /**
   * Inicia sesión con un correo y contraseña
   * @param email - Correo electrónico del usuario
   * @param password - Contraseña del usuario
   * @returns Observable<boolean> - Indica si la autenticación fue exitosa
   */
  login(email: string, password: string): Observable<boolean> {
    // Simular autenticación exitosa
    if (email === 'user@example.com' && password === 'password123') {
      this.isAuthenticated.next(true);
      return new BehaviorSubject(true).asObservable();
    } else {
      this.isAuthenticated.next(false);
      return new BehaviorSubject(false).asObservable();
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    this.isAuthenticated.next(false);
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns Observable<boolean> - Estado de autenticación
   */
  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}

