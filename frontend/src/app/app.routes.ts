import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateProductComponent } from './product/product.component';
import { HomepageComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'products/:id/edit', component: CreateProductComponent },
  { path: 'products/new', component: CreateProductComponent },
  { path: 'homepage', component: HomepageComponent },

  { path: '**', redirectTo: '/login' },
];
