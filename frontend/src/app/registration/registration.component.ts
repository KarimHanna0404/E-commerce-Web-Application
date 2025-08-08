import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  fb = inject(FormBuilder)
  httpClient = inject(HttpClient)

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    console.log("login form", this.loginForm.value)
    if (this.loginForm.valid) {
      this.httpClient.post('api/user/login', this.loginForm.value).subscribe({
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
