import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { FileUpload } from 'primeng/fileupload';
import{Product}from '../models/product.model';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: false
})
export class CreateProductComponent implements OnInit {
   @ViewChild('fileUpload') fileUpload?: FileUpload;
  productForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  products: Product[] = [];
  selectedImageBase64: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      imageUrl: [null, Validators.required],
      description: ['', Validators.maxLength(1000)],
      price: [0, [Validators.required, Validators.min(0.01)]],
      code: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }



onFileChange(event: FileUploadHandlerEvent): void {
  const file = event.files && event.files.length ? event.files[0] : null;

  if (!file) {
    return;
  }

  const validImageTypes = ['image/png', 'image/jpeg'];

  if (!validImageTypes.includes(file.type)) {
    this.errorMessage = 'Please upload a PNG or JPG file.';
    this.productForm.patchValue({ imageUrl: null });
    this.selectedImageBase64 = null;
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    this.selectedImageBase64 = reader.result as string;
    this.productForm.patchValue({ imageUrl: this.selectedImageBase64 });
    this.errorMessage = null;
    
  };
  reader.readAsDataURL(file);
}


  

  async onSubmit(): Promise<void> {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

   
 
    const payload = {
      name: this.productForm.get('name')?.value,
      imageUrl: this.productForm.get('imageUrl')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
      code: this.productForm.get('code')?.value,
    };

    try {
      const response = await this.productService.createProduct(payload);
      this.successMessage = 'Product created successfully!';
      this.errorMessage = null;
      this.productForm.reset();

          this.selectedImageBase64 = null;

    this.fileUpload?.clear();

      if (response) {
        this.products.push(response);
      }
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Error creating product.';
      this.successMessage = null;
    }
  }

  onCancel(): void {
    this.productForm.reset();
    this.successMessage = null;
    this.errorMessage = null;
  }

  private loadProducts(): void {
    
      this.productService.getProducts().subscribe({
        next: (res) => {
          this.products = res.Products;
        },
        error: () => (this.errorMessage = 'Error loading products.'),
      });
  }
}
