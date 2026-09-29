import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ModalBase } from "../modal-base/modal-base";
import { ZoomableImage } from "../../images/zoomable-image/zoomable-image";

@Component({
  selector: 'modal-preview-image',
  imports: [ModalBase, ZoomableImage],
  templateUrl: './modal-preview-image.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ModalPreviewImage {
  image = input.required<string>();
  imgClass = input<string>('');
}
