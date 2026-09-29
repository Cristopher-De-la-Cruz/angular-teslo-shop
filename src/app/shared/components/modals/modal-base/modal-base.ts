import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  signal,
} from '@angular/core';

@Component({
  selector: 'modal-base',
  standalone: true,
  imports: [],
  templateUrl: './modal-base.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  exportAs: 'modal',
})
export class ModalBase {

  open = signal<boolean>(false);
  closing = signal(false);

  // Elemento proyectado que tenga [modal-content]
  modalContent = contentChild<ElementRef<HTMLElement>>('modal-content');

  openModal() {
    this.open.set(true);
  }

  closeModal() {
    this.closing.set(true);

    setTimeout(() => {
      this.open.set(false);
      this.closing.set(false);
    }, 200);
  }

  // handleOverlayClick(event: MouseEvent) {

  //   const content = this.modalContent();

  //   if (!content) {
  //     this.closeModal();
  //     return;
  //   }

  //   const target = event.target as Node;

  //   if (!content.nativeElement.contains(target)) {
  //     this.closeModal();
  //   }
  // }
  handleOverlayClick(event: MouseEvent) {

    const target = event.target as HTMLElement;

    if (target.closest('[modal-content]')) {
      return;
    }

    this.closeModal();
  }
}
