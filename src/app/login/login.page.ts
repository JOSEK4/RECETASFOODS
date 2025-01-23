import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.loginUser(loginData).subscribe(
        async (response) => {
          localStorage.setItem('authToken', response.token); // Guarda el token
          await this.showAlert('Inicio de sesión exitoso');
          this.router.navigate(['/home']);
        },
        async (error) => {
          await this.showAlert('Error al iniciar sesión: ' + error.error.message);
        }
      );
    } else {
      await this.showAlert('Por favor, completa todos los campos correctamente.');
    }
  }

  // Método para redirigir al registro
  goToRegister() {
    this.router.navigate(['/registro']);  // Redirige a la página de registro
  }
}
