import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal } from '@angular/core';
import { PaginationButton } from "./pagination-button/pagination-button";
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  imports: [PaginationButton],
  templateUrl: './pagination.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Pagination {
  pages = input<number>(0);
  paginationService = inject(PaginationService);

  activePage = linkedSignal(this.paginationService.currentPage);

  getList = computed<number[]>(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });

  getPagesList = computed<number[]>(() => {
    const list = this.getList();
    const currentPage = this.activePage();

    const totalPages = list.length;
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      return list;
    }

    let start = currentPage - 3;
    let end = currentPage + 3;

    // Si nos pasamos por el inicio
    if (start < 1) {
      end += 1 - start;
      start = 1;
    }

    // Si nos pasamos por el final
    if (end > totalPages) {
      start -= end - totalPages;
      end = totalPages;
    }

    return list.slice(start - 1, end);
  });

  finalPage = computed<number>(() => {
    return this.getList().slice(-1)[0] ?? 0;
  })

}
