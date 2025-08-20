import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { FileUpload } from 'primeng/fileupload';
import { Router ,ActivatedRoute} from '@angular/router';

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  code: string;
}

@Component({
  selector: 'app-create-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: false,
})
export class CreateProductComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload?: FileUpload;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  productForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  products: Product[] = [];
    productId: number | null = null;

  selectedImageBase64: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      image: [null, Validators.required],
      description: ['', Validators.maxLength(1000)],
      price: [0, [Validators.required, Validators.min(0.01)]],
      code: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]],
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')); 

    if (this.productId) {
      this.loadProduct(this.productId); 
    }
  }

    private loadProduct(id: number): void {
    this.http.get<Product>(`http://localhost:8080/api/products/${id}`, { withCredentials: true })
      .subscribe({
        next: (product) => {
          this.productForm.patchValue(product);
        },
        error: () => {
          this.errorMessage = 'Error loading product for edit.';
        }
      });
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
      this.productForm.patchValue({ image: this.selectedImageBase64 });
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

  const payload = this.productForm.value;

  try {
    if (this.productId) {
      const response = await this.http
        .put<Product>(
          `http://localhost:8080/api/products/${this.productId}`,
          payload,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        )
        .toPromise();

      this.successMessage = 'Product updated successfully!';
      this.errorMessage = null;
    } else {
      const response = await this.http
        .post<Product>(
          'http://localhost:8080/api/products',
          payload,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        )
        .toPromise();

      if (response) {
        this.products.push(response);
      }
      this.successMessage = 'Product created successfully!';
      this.errorMessage = null;
    }

    this.productForm.reset();
    this.selectedImageBase64 = null;
    this.fileUpload?.clear();
    this.router.navigate(['/homepage']);
  } catch (error: any) {
    this.errorMessage = error.error?.message || 'Error saving product.';
    this.successMessage = null;
  }
}


  onCancel(): void {
    this.productForm.reset();
    this.successMessage = null;
    this.errorMessage = null;
  }

  private loadProducts(): void {
    this.http.get<Product[]>('http://localhost:8080/api/products').subscribe({
      next: (products: Product[]) => (this.products = products),
      error: () => (this.errorMessage = 'Error loading products.'),
    });
  }
}
