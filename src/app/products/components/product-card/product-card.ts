import { Product } from '@/products/interfaces/product.interface';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { environment } from '../../../../environments/environment';
import { SlicePipe } from '@angular/common';
import { ProductImagePipe } from "../../pipes/product-image.pipe";

const baseUrl = environment.baseUrl;

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductCard {
  product = input.required<Product>();
  imageUrl = computed(() => {
    return `${baseUrl}/files/product/${this.product().images[0]}`;
  });
}
