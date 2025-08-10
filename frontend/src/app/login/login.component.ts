import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from '../app.routes';

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


  if (!this.loginForm.value.username || !this.loginForm.value.password) {
    alert("Username or password is empty. Request not sent.");
    return;
  }

    if (this.loginForm.valid) {
      this.httpClient.post('http://localhost:8080/api/user/login', this.loginForm.value).subscribe({
        next: (Response) => {
          console.log('login successful :', Response);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      })
    }
  }
}
