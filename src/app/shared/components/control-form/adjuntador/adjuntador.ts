import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { ModalPreviewImage } from "../../modals/modal-preview-image/modal-preview-image";
import { adjuntadorChanged } from '../interfaces/adjuntador.interface';

@Component({
  selector: 'app-adjuntador',
  imports: [ModalPreviewImage],
  templateUrl: './adjuntador.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Adjuntador {
  imageFileList: FileList | undefined = undefined;
  tempImages = signal<string[]>([]);

  filesChanged = output<adjuntadorChanged>();

  onFilesChanged(event: Event) {
    // Obtiene lista de archivos
    const fileList = (event.target as HTMLInputElement).files;
    this.imageFileList = fileList ?? undefined;
    // genera urls temporales
    const imageUrls = Array.from(fileList ?? []).map(
      file => URL.createObjectURL(file)
    );
    this.tempImages.set(imageUrls);
    this.filesChanged.emit({
      imageFileList: this.imageFileList,
      tempImages: this.tempImages(),
    });
  }

  removeImage(index: number) {
    this.tempImages.update(images => [
      ...images.slice(0, index),
      ...images.slice(index + 1)
    ]);

    if (this.imageFileList) {
      const dataTransfer = new DataTransfer();

      Array.from(this.imageFileList)
        .filter((_, i) => i !== index)
        .forEach(file => dataTransfer.items.add(file));

      this.imageFileList = dataTransfer.files.length !== 0 ? dataTransfer.files : undefined;
    }

    this.filesChanged.emit({
      imageFileList: this.imageFileList,
      tempImages: this.tempImages(),
    });
  }

}
