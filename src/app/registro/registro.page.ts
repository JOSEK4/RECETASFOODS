import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage {
  registroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.registroForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async registerUser() {
    if (this.registroForm.valid) {
      const registroData = this.registroForm.value;
      delete registroData.confirmPassword; // Eliminar confirmación antes de enviar
      this.authService.registerUser(registroData).subscribe(
        async () => {
          await this.showAlert('Registro exitoso. Ahora puedes iniciar sesión.');
          this.router.navigate(['/login']);
        },
        async (error) => {
          await this.showAlert('Error al registrarse: ' + error.error.message);
        }
      );
    } else {
      await this.showAlert('Por favor, completa todos los campos correctamente.');
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
