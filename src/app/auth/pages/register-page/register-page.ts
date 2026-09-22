import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LabelInput } from "@/shared/components/control-form/label-input/label-input";
import { Alert } from "@/shared/components/alert/alert";
import { FormUtils } from '@/utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule, LabelInput, Alert],
  templateUrl: './register-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  isSuccess = signal(false);
  hasError = signal(false);


  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.pattern(FormUtils.passwordPattern)

      ]],
    fullName: ['', [Validators.required]]
  });

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      this.onErrors();
      return;
    }

    const { email = '', password = '', fullName = '' } = this.registerForm.value;

    this.authService.register(fullName!, email!, password!).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.isSuccess.set(true);
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 2000)
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
