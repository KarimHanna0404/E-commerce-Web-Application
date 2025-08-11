import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from '../app.routes';
import { catchError, throttleTime, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  fb = inject(FormBuilder)
  httpClient = inject(HttpClient)

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    console.log("login form", this.loginForm.value)
    this.errorMessage = null;


  if (!this.loginForm.value.username || !this.loginForm.value.password) {
    alert("Username or password is empty. Request not sent.");
    return;
  }

    if (this.loginForm.valid) {
      this.httpClient.post('http://localhost:8080/api/user/login', this.loginForm.value).pipe(
        catchError(error => {
          this.errormessage = error.error?.Message || 'failed login';
          return throwError(() => Error)};
        )
      
    ).subscribe({
        next: (res) => {
          console.log('login successful :', res);
          alert('login successful');
        },
        error: (err) => {
          console.error('Login failed:', err);
                    alert('login failed');
        }
      })
    }
  }
}
