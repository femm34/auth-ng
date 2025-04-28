import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService: AuthService = inject(AuthService)

  message: string = '';


  ngOnInit() {
    this.authService.check()
      .subscribe(response => {
        this.message = response.message
        console.log('Respuesta:', response);
      });
  }

}
