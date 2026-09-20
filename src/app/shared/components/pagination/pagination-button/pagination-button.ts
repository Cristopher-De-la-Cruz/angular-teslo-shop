import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'pagination-button',
  imports: [RouterLink],
  templateUrl: './pagination-button.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class PaginationButton {
  page = input.required<number>();
  activePage = model.required<number>();

}
