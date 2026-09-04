import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { ProductImagePipe } from '@/products/pipes/product-image.pipe';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
    }
  `
})
export class ProductCarousel implements AfterViewInit {

  images = input.required<string[]>();

  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  swiper?: Swiper;

  constructor() {
    effect(() => {
      this.images(); // señal que si cambia se dispara el efecto
      if (!this.swiperDiv) return;
      // Esperamos a que Angular actualice el DOM
      queueMicrotask(() => {
        this.swiper?.destroy(true, true);
        const paginationEl: HTMLDivElement = this.swiperDiv().nativeElement?.querySelector('.swiper-pagination');
        paginationEl.innerHTML = '';

        this.swiperInit();
      });
    });
  }

  ngAfterViewInit(): void {
    this.swiperInit();
  }

  swiperInit(): void {
    const element = this.swiperDiv().nativeElement;

    this.swiper = new Swiper(element, {
      direction: 'horizontal',
      loop: true,

      modules: [
        Navigation,
        Pagination
      ],

      pagination: {
        el: '.swiper-pagination',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
