import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

function matchPasswords(group: AbstractControl): ValidationErrors | null {
  const pwd = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pwd && confirm && pwd !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
    router = inject(Router);


  registrationForm = this.fb.group({
        username: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, { validators: matchPasswords });

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }
    const payload = {
      username:this.registrationForm.value.username,
      firstname:this.registrationForm.value.first_name,
      lastname:this.registrationForm.value.last_name,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    };


this.http.post('http://localhost:8080/api/user/register', payload, { responseType: 'text' })
  .subscribe({
    next: (res) => {
      console.log('registration successful:', res);
      this.router.navigate(['login']);

    },
    error: (err) => {
      console.error('Registered failed:', err);
    }
  });
  }
}