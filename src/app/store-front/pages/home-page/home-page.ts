import { ProductCard } from '@/products/components/product-card/product-card';
import { ProductsService } from '@/products/services/products.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'
import { ProductCardSkeleton } from "@/products/components/product-card/product-card-skeleton/product-card-skeleton";

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, ProductCardSkeleton],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class HomePage {
  productsService = inject(ProductsService);

  productsResource = rxResource(
    {
      params: () => ({}),
      stream: ({ params }) => {
        return this.productsService.getProducts({
          
        })
      }
    }

  );


}
