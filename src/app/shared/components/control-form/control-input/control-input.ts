import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorLabel } from "../../pagination/form-error-label/form-error-label";

@Component({
  selector: 'control-input',
  imports: [FormErrorLabel, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './control-input.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ControlInput {
  controlForm = input.required<FormGroup>();
  controlName = input.required<string>();
  placeholder = input<string>('Ingresar...');
}
