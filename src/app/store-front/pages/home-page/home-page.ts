import { ProductCard } from '@/products/components/product-card/product-card';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class HomePage {}
