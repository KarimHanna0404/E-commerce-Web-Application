import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  fb = inject(FormBuilder);
  httpClient = inject(HttpClient);
  router = inject(Router);

  loginError: string | null = null;

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    console.log('Login form data:', this.loginForm.value);
    this.loginError = null;

    if (this.loginForm.valid) {
      this.httpClient
        .post('http://localhost:8080/api/user/login', this.loginForm.value, {
          withCredentials: true,
        })
        .pipe(
          catchError((error) => {
            this.loginError =
              error.error?.Message || 'Username or Password invaild';
            return throwError(() => error);
          })
        )
        .subscribe({
          next: (res) => {
            console.log('Login successful:', res);
            this.router.navigate(['homepage']);
          },
          error: (err) => {
            console.error('Login failed:', err);
          },
        });
    }
  }
}
