import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  hasError = signal(false);


  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    fullName: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.onErrors();
      return;
    }

    const { email = '', password = '', fullName = '' } = this.registerForm.value;

    this.authService.register(fullName!, email!, password!).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.onErrors();
    });
  }

  onErrors() {
    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 2500);
  }
}
