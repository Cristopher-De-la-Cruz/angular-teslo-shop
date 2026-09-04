import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';


const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string[] | string | null): string {
    if (value === null) {
      return './assets/images/no-image.jpg';
    }
    if (typeof value === 'string') {
      if (value.startsWith('blob:')) return value;
      return `${baseUrl}/files/product/${value}`
    };
    const image = value.at(0);
    if (image) return `${baseUrl}/files/product/${image}`;
    return './assets/images/no-image.jpg';
  }
}
