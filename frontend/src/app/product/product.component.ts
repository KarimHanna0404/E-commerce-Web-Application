import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { FileUpload } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
  productForm: FormGroup;
  errorMessage: string | null = null;
  products: Product[] = [];
  selectedImageBase64: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      imageUrl: [null, Validators.required],
      description: ['', Validators.maxLength(1000)],
      price: [0, [Validators.required, Validators.min(0.01)]],
      code: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]],
    });
  }

  ngOnInit(): void {}

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
      const createObservable = this.http.post<Product>(
        'http://localhost:8080/api/products',
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      await firstValueFrom(createObservable);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product created successfully',
      });
      this.router.navigate(['/homepage']);
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error creating product.',
      });
    }
  }

  onCancel(): void {
    this.productForm.reset();
    this.errorMessage = null;
  }
}
