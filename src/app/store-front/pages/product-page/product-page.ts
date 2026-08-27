import { ProductsService } from '@/products/services/products.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCarousel } from "@/products/components/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductPage {
  productIdSlug: string = inject(ActivatedRoute).snapshot.params['idSlug'];
  productService = inject(ProductsService);

  productResource = rxResource(
    {
      params: () => ({}),
      stream: ({ params }) => {
        return this.productService.getProductByIdSlug(this.productIdSlug);

      }
    }
  );


}
