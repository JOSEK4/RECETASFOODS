import { Component, OnInit } from '@angular/core';
import {FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: any;
  formErrors= {
    email:[
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'Ingresa un correo válido' },
    ],
   password:[{ type: 'required', message: 'La contraseña es obligatoria' },
    { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' },
  ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
   }

  ngOnInit() {}

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      //  autenticación
      if (email === 'usuario@example.com' && password === '123456') {
        this.router.navigate(['/home']); // Redirige a la página principal
      } else {
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
    } else {
      this.errorMessage = 'Por favor, completa los campos correctamente.';
    }
  }
}
