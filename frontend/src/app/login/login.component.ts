import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from '../app.routes';
import { catchError, throttleTime, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  fb = inject(FormBuilder)
  httpClient = inject(HttpClient)

    loginError: string | null = null;


  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    console.log("login form", this.loginForm.value)
    this.loginError = null;



    if (this.loginForm.valid) {
      this.httpClient.post('http://localhost:8080/api/user/login', this.loginForm.value).pipe(
        catchError(error => {
          this.loginError = error.error?.Message || 'failed login';
          return throwError(() => Error)}
        )
      
    ).subscribe({
        next: (res) => {
          console.log('login successful :', res);
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      })
    }
  }
}
