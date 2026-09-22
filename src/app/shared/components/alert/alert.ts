import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Alert {
  message = input.required<string>();
  type = input<'success' | 'error'>('success');

}
