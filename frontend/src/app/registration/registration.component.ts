import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

//checking if password matches with confirmPassword
function matchPasswords(group: AbstractControl): ValidationErrors | null {
  const pwd = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pwd && confirm && pwd !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  registrationForm = this.fb.group({
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
      name: `${this.registrationForm.value.first_name} ${this.registrationForm.value.last_name}`,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    };


    this.http.post('/api/user/register', payload).subscribe({
      next: (res: any) => {
        console.log('registration successful:', res);
        alert('Registered successfully!');
      },
      error: (err: any) => {
        console.error('registration failed:', err);
        alert('Registration failed. Check console for details.');
      }
    });
  }
}
