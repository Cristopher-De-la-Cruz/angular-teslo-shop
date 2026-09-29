import { Product } from '@/products/interfaces/product.interface';
import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { ProductCarousel } from "@/products/components/product-carousel/product-carousel";
import { AbstractControl, AsyncValidatorFn, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormUtils } from '@/utils/form-utils';
import { ProductsService } from '../../../../products/services/products.service';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { LabelInput } from "@/shared/components/control-form/label-input/label-input";
import { LabelTextarea } from "@/shared/components/control-form/label-textarea/label-textarea";
import { Alert } from "@/shared/components/alert/alert";
import { Adjuntador } from "@/shared/components/control-form/adjuntador/adjuntador";
import { adjuntadorChanged } from '@/shared/components/control-form/interfaces/adjuntador.interface';

@Component({
  selector: 'product-details',
  imports: [ProductCarousel, ReactiveFormsModule, LabelInput, LabelTextarea, Alert, Adjuntador],
  templateUrl: './product-details.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductDetails implements OnInit {
  product = input.required<Product>();
  router = inject(Router);

  private fb = inject(FormBuilder);
  productsService = inject(ProductsService);

  hasErrors = signal(false);
  wasSaved = signal(false);
  imageFileList: FileList | undefined = undefined;
  tempImages = signal<string[]>([]);

  carrouselImages = computed(() => [... this.product().images ?? [], ... this.tempImages() ?? []]);


  verifyIdSlug: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {

    const formSlug = control.value;
    const productSlug = this.product()?.slug;

    // Si estamos editando y el slug no cambió
    if (formSlug === productSlug) {
      return of(null);
    }

    return this.productsService.getProductByIdSlug(formSlug).pipe(
      map(() => ({
        slugTaken: true
      })),
      catchError(() => of(null))
    );
  };

  productForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)], [this.verifyIdSlug]],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(1)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],

  });

  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  genders: string[] = ['Men', 'Women', 'Kid', 'Unisex'];


  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    // this.productForm.reset(this.product() as any);
    this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',') });
  }

  async onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();
    if (!isValid) return;

    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ... (formValue as any),
      // tags: formValue.tags?.toLowerCase().split(',')
      //   .map(tag => tag.trim()) ?? []
      tags: formValue.tags?.toLowerCase().split(',').map(tag => tag.trim()) ?? []
    }

    let withErrors = false;
    try {
      if (this.product().id === 'new') {
        // Crear
        const product = await firstValueFrom(
          this.productsService.createProduct(productLike, this.imageFileList)
        );
        this.router.navigate(['/admin/products', product.id]);
      } else {
        console.log(this.imageFileList);
        await firstValueFrom(this.productsService.updateProduct(this.product().id, productLike, this.imageFileList));
      }

      this.wasSaved.set(true);
      setTimeout(() => {
        this.wasSaved.set(false);
      }, 3000);
    } catch (err) {
      this.hasErrors.set(true);
      setTimeout(() => {
        this.hasErrors.set(false);
      }, 3000);
    }

  }

  onSizeClicked(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];
    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
      // this.productForm.value.sizes = currentSizes.filter(prev => prev !== size);
    } else {
      currentSizes.push(size);
      // this.productForm.value.sizes = [... currentSizes, size];
    }
    this.productForm.patchValue({ sizes: currentSizes });
  }

  onFilesChanged(change: adjuntadorChanged) {
    console.log({change});
    this.imageFileList = change.imageFileList;
    this.tempImages.set(change.tempImages);
  }
}
