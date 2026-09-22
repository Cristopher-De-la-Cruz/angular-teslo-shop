import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '@/auth/services/auth.service';
import { LabelInput } from "@/shared/components/control-form/label-input/label-input";
import { FormUtils } from '@/utils/form-utils';
import { Alert } from "@/shared/components/alert/alert";

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, LabelInput, Alert],
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class LoginPage {

  fb = inject(FormBuilder);

  authService = inject(AuthService)
  router = inject(Router);

  hasError = signal(false);
  isSuccess = signal(false);
  isPosting = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
      Validators.pattern(FormUtils.passwordPattern)
    ]],
  });

  onSubmit() {
    console.log(this.loginForm.controls.password.errors)
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.isSuccess.set(true);
        setTimeout(() => {
          this.router.navigateByUrl('/');
          return;
        }, 2000)
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);

      }, 2000);
    })
  }




}
