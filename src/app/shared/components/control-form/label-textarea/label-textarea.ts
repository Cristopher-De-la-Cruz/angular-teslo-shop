import { FormUtils } from '@/utils/form-utils';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-label-textarea',
  imports: [ReactiveFormsModule],
  templateUrl: './label-textarea.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class LabelTextarea {
  form = input.required<FormGroup>();
  control = input.required<FormControl>();
  label = input.required<string>();
  rows = input<number>(2);
  controlName = computed(() => {
    const controls = this.form().controls;
    const control = this.control();

    return Object.keys(controls).find(
      key => controls[key] === control
    ) ?? '';
  });


  formUtils = FormUtils;


}
