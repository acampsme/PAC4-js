import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="page-shell">
      <h2>Login</h2>
      <form [formGroup]="form" (ngSubmit)="submit()" class="form-card">
        <label>
          Username
          <input formControlName="username" />
          <p *ngIf="submitted && form.get('username')?.invalid" class="error">Username is required.</p>
        </label>
        <label>
          Password
          <input formControlName="password" type="password" />
          <p *ngIf="submitted && form.get('password')?.invalid" class="error">Password is required.</p>
        </label>
        <button type="submit">Login</button>
        <p *ngIf="submitted && form.invalid" class="error">Please fill in both fields before logging in.</p>
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
    `
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error = '';
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userStore: UserStoreService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.userStore.isAuthenticated()) {
      this.router.navigate(['/article/list']);
    }
  }

  submit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.error = '';
    this.userService.login(this.form.value).subscribe({
      next: ({ token }) => {
        this.userStore.login(token);
        this.router.navigate(['/article/list']);
      },
      error: () => {
        this.error = 'Login failed. Check credentials and try again.';
      }
    });
  }
}
