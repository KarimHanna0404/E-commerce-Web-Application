import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router'; // Added Router import
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  fb = inject(FormBuilder);
  httpClient = inject(HttpClient);
  router = inject(Router);

  loginError: string | null = null;

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    console.log("Login form data:", this.loginForm.value);
    this.loginError = null;

    if (this.loginForm.valid) {
      this.httpClient.post('http://localhost:8080/api/user/login',this.loginForm.value,{
    withCredentials: true}, ).pipe(
        catchError(error => {
          this.loginError = error.error?.Message || 'Failed login';
          return throwError(() => error);
        })
      ).subscribe({
        next: (res) => {
          console.log('Login successful:', res);
          this.router.navigate(['products']);
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });
    }
  }
}
