import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component'; // Import AppComponent

platformBrowser()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

  bootstrapApplication(AppComponent, {
    providers: [
      provideAnimations(),
    ],
  });