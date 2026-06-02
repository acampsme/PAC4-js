import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="page-shell">
      <h2>Register</h2>
      <form [formGroup]="form" (ngSubmit)="submit()" class="form-card">
        <label>
          Username
          <input formControlName="username" />
        </label>
        <label>
          Password
          <input formControlName="password" type="password" />
        </label>
        <button type="submit" [disabled]="form.invalid">Register</button>
        <p *ngIf="message" class="success">{{ message }}</p>
        <p *ngIf="error" class="error">{{ error }}</p>
      </form>
    </section>
  `,
  styles: [
    `.page-shell { max-width: 480px; margin: 2rem auto; padding: 1rem; }
     .form-card { display: grid; gap: 1rem; background: #ffffff; border: 1px solid #cbd5e1; padding: 1.2rem; border-radius: 0.75rem; }
     label { display: grid; gap: 0.4rem; font-weight: 600; }
     input { width: 100%; padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; }
     button { border: none; background: #0f172a; color: #fff; padding: 0.9rem; border-radius: 0.5rem; cursor: pointer; }
     .error { color: #b91c1c; margin: 0; }
     .success { color: #154f31; margin: 0; }
    `
  ]
})
export class RegisterComponent {
  form: FormGroup;
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.error = '';
    this.userService.register(this.form.value).subscribe({
      next: () => {
        this.message = 'Registration successful. Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 900);
      },
      error: () => {
        this.error = 'Registration failed. Username may already exist.';
      }
    });
  }
}
