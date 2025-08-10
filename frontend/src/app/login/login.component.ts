import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],   
    password: ['', [Validators.required]]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.http.post('http://localhost:8080/api/user/login', payload, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        alert('Login successful!');
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }
}