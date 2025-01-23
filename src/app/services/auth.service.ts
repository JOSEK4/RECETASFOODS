import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlServer = 'http://51.79.26.171'; // Dirección del servidor
  // urlServer = 'http://localhost:3000'; // Alternativa local para desarrollo
  httpHeaders = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

  constructor(private http: HttpClient) {}

  /**
   * Registrar un nuevo usuario.
   * @param userData - Objeto con la información del usuario (email, password, etc.).
   * @returns Observable con la respuesta del servidor.
   */
  registerUser(userData: any): Observable<any> {
    const url = `${this.urlServer}/register`;
    return this.http.post(url, userData, this.httpHeaders);
  }

  /**
   * Autenticar un usuario.
   * @param loginData - Objeto con las credenciales del usuario (email y password).
   * @returns Observable con el token o la respuesta del servidor.
   */
  loginUser(loginData: any): Observable<any> {
    const url = `${this.urlServer}/login`;
    return this.http.post(url, loginData, this.httpHeaders);
  }

  /**
   * Verificar si el usuario está autenticado.
   * @returns Una promesa que resuelve `true` o `false`.
   */
  async isAuthenticated(): Promise<boolean> {
    const token = localStorage.getItem('authToken');
    return token !== null; // Verifica si el token existe en el almacenamiento local.
  }

  /**
   * Cerrar sesión del usuario.
   * Elimina el token de autenticación del almacenamiento local.
   */
  logout(): void {
    localStorage.removeItem('authToken');
  }
}

