import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(() => {
      this.router.navigate(['/']);
    }, () => alert('Credenciales incorrectas'));
  }
}
