import { FormUtils } from '@/utils/form-utils';
import { Component, computed, input, linkedSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface LabelInputForm {
  [key: string]: any;
}

@Component({
  selector: 'app-label-input',
  imports: [ReactiveFormsModule],
  templateUrl: './label-input.html',
})
export class LabelInput {
  form = input.required<FormGroup>();
  control = input.required<FormControl>();
  label = input.required<string>();
  inputType = input<'text' | 'password' | 'number'>('text');
  type = linkedSignal(this.inputType);
  inputPassword = computed<boolean>(() => this.inputType() === 'password');

  formUtils = FormUtils;
  controlName = computed(() => {
    const controls = this.form().controls;
    const control = this.control();

    return Object.keys(controls).find(
      key => controls[key] === control
    ) ?? '';
  });

  togglePassword() {
    return this.type.update(type => type === 'password' ? 'text' : 'password');
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.type() === 'number') {
      this.control().setValue(input.value === '' ? null : Number(input.value));
    }
  }

}
