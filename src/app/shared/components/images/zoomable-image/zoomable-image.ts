import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'zoomable-image',
  imports: [],
  templateUrl: './zoomable-image.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ZoomableImage {
  url = input.required<string>();
  imgClass = input<string>('');
  isZoomed = signal(false);

  toggleZoom(): void {
    this.isZoomed.update(value => !value);
  }

}
