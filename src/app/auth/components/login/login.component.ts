import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../schemas/login-request.schema';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from '../../interceptors/auth.interceptor';


@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [{ provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true }]

})
export class LoginComponent implements OnInit {
  private authService: AuthService = inject(AuthService);

  // constructor(readonly authService: AuthService) {
  //   this.authService = authService;
  // }

  loginForm!: FormGroup<{ username: FormControl<string>; password: FormControl<string>; }>;


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {

      const loginRequest: LoginRequest = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!
      };

      this.authService.signIn(loginRequest).subscribe({
        next: (response) => {
          this.authService.setCredentials(response.data);
          this.authService.setAuthenticated(true);
          console.log('Inicio de sesión exitoso', response);
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
        }
      });

    } else {
      console.log('Formulario no válido');
    }
  }

}
