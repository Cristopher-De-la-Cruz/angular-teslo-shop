import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'product-card-skeleton',
  imports: [],
  templateUrl: './product-card-skeleton.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductCardSkeleton {}
