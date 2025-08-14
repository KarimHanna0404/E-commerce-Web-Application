import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateProductComponent } from './product/product.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'products', component: CreateProductComponent},

  { path: '**', redirectTo: '/login' },
];
