import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import * as CryptoJS from 'crypto-js';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: Storage,
    private alertController: AlertController
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;

      // Validar si las contraseñas coinciden
      if (password !== this.registerForm.get('confirmPassword')?.value) {
        await this.showAlert('Error', 'Las contraseñas no coinciden.');
        return;
      }

      // Encriptar la contraseña
      const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();

      // Guardar credenciales en el almacenamiento
      await this.storage.set('userEmail', email);
      await this.storage.set('userPassword', encryptedPassword);

      // Redirigir al login con éxito
      await this.showAlert('Éxito', 'Registro exitoso. ¡Ahora puedes iniciar sesión!');
      this.router.navigate(['/login']);
    } else {
      await this.showAlert('Error', 'Por favor, completa todos los campos correctamente.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
