import { ProductsService } from '@/products/services/products.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductCardSkeleton } from "@/products/components/product-card/product-card-skeleton/product-card-skeleton";
import { ProductCard } from "@/products/components/product-card/product-card";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardSkeleton, ProductCard],
  templateUrl: './gender-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GenderPage {
  activatedRoute = inject(ActivatedRoute);

  productsService = inject(ProductsService);
  gender = toSignal(this.activatedRoute.params.pipe( map(({ gender }) => gender)));

  productsResource = rxResource(
    {
      params: () => ({ gender: this.gender() }),
      stream: ({params}) => {
        return this.productsService.getProducts({gender: params.gender});
      }
    }
  );



}
