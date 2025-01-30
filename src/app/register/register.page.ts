import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';

  formErrors = {
    user: [
      { type: 'required', message: 'El usuario es obligatorio' },
      { type: 'minlength', message: 'El usuario debe tener al menos 5 caracteres' }
    ],
    name: [
      { type: 'required', message: 'El nombre es obligatorio' }
    ],
    lastname: [
      { type: 'required', message: 'El apellido es obligatorio' }
    ],
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es válido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    ],
    passwordConfirmation: [
      { type: 'required', message: 'La confirmación de la contraseña es obligatoria' },
      { type: 'minlength', message: 'La confirmación de la contraseña debe tener al menos 6 caracteres' },
      { type: 'mustMatch', message: 'Las contraseñas no coinciden' }
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.mustMatch('password', 'passwordConfirmation') });
  }

  ngOnInit() {}

  mustMatch(password: string, passwordConfirmation: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[passwordConfirmation];

      if (confirmPassControl.errors && !confirmPassControl.errors['mustMatch']) {
        return;
      }

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }

  registerUser(registerData: any) {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(registerData)
      .then(() => {
        this.errorMessage = '';
        this.navCtrl.navigateForward('/login');
      })
      .catch((err: any) => {
        console.log(err);
        this.errorMessage = err;
      });
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
