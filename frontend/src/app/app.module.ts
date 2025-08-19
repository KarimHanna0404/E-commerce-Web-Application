import { CommonModule } from '@angular/common';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateProductComponent } from './product/product.component';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { BrowserModule } from '@angular/platform-browser';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';








@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    RouterOutlet,
    InputGroupModule,
    InputGroupAddonModule,
    MessageModule,
    FloatLabelModule,
    InputTextModule,
    EditorModule,
    InputNumberModule,
    FileUploadModule,
    ButtonModule,
    BadgeModule,
    ToastModule,
    ProgressBarModule,
    
   
    
   
   

    
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CreateProductComponent,
  ],
  providers: [
    MessageService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
