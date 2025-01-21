import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import * as CryptoJS from 'crypto-js';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: string = ''; // Define la propiedad

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: Storage,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      const storedEmail = await this.storage.get('userEmail');
      const storedEncryptedPassword = await this.storage.get('userPassword');

      if (storedEmail && storedEncryptedPassword) {
        const bytes = CryptoJS.AES.decrypt(storedEncryptedPassword, 'secret-key');
        const storedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (email === storedEmail && password === storedPassword) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Credenciales incorrectas.';
        }
      } else {
        this.errorMessage = 'No hay usuarios registrados. Por favor, regístrate.';
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  // Método para redirigir al registro
  goToRegister() {
    this.router.navigate(['/registro']);  // Redirige a la página de registro
  }
}
