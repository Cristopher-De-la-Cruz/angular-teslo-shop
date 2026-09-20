import { ProductsService } from '@/products/services/products.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductCardSkeleton } from "@/products/components/product-card/product-card-skeleton/product-card-skeleton";
import { ProductCard } from "@/products/components/product-card/product-card";
import { Pagination } from "@/shared/components/pagination/pagination";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardSkeleton, ProductCard, Pagination],
  templateUrl: './gender-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GenderPage {
  activatedRoute = inject(ActivatedRoute);
  paginationService = inject(PaginationService);

  productsService = inject(ProductsService);
  gender = toSignal(this.activatedRoute.params.pipe(map(({ gender }) => gender)));

  productsResource = rxResource(
    {
      params: () => ({ gender: this.gender(), page: this.paginationService.currentPage() - 1 }),
      stream: ({ params }) => {
        return this.productsService.getProducts({
          gender: params.gender,
          offset: params.page * this.productsService.getLimitProductsPerPage(),
        });
      }
    }
  );



}
