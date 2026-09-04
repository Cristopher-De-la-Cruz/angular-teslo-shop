import { ProductTable } from '@/products/components/product-table/product-table';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ProductCard } from "@/products/components/product-card/product-card";
import { Pagination } from "@/shared/components/pagination/pagination";
import { ProductsService } from '../../../products/services/products.service';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductsAdminPage {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsPerPage = signal(10);

  productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1, limit: this.productsPerPage() }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        limit: params.limit,
        offset: params.page * params.limit
      });
    }
  });

}
