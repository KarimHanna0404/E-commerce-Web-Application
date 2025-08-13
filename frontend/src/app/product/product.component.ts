import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  id: number;
  name: string;
  image: File | null;
  description: string;
  price: number;
  code: string;
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  products: Product[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      image: [null, Validators.required],
      description: ['', Validators.maxLength(1000)],
      price: [0, [Validators.required, Validators.min(0.01)]],
      code: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]]
    });
  }

  ngOnInit(): void {
   
    this.loadProducts();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const validImageTypes = ['image/png', 'image/jpeg'];
      if (validImageTypes.includes(file.type)) {
        this.productForm.patchValue({ image: file });
      } else {
        this.errorMessage = 'Please upload a PNG or JPG file.';
        this.productForm.get('image')?.setValue(null);
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('image', this.productForm.get('image')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('code', this.productForm.get('code')?.value);

    try {
      
      const codeExists = await this.checkCodeUniqueness(this.productForm.get('code')?.value);
      if (codeExists) {
        this.errorMessage = 'Product code already exists.';
        return;
      }

      
      const response = await this.http.post<Product>('/api/products', formData).toPromise();
      this.successMessage = 'Product created successfully!';
      this.errorMessage = null;
      this.productForm.reset();
      this.products.push(response); 
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

  private async checkCodeUniqueness(code: string): Promise<boolean> {
    try {
      const response = await this.http.get<{ exists: boolean }>(/api/products/check-code?code=${code}).toPromise();
      return response.exists;
    } catch {
      return false;
    }
  }

  private loadProducts(): void {
    this.http.get<Product[]>('/api/products').subscribe({
      next: (products) => this.products = products,
      error: () => this.errorMessage = 'Error loading products.'
    });
  }
}