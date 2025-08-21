import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Component } from '@angular/core';


@NgModule({
  declarations: [AppComponent, CartComponent],
  imports: [BrowserModule, InputNumberModule, ButtonModule, DialogModule],
  bootstrap: [AppComponent]
})
export class AppModule {}

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  itemCount: number = 0;

  updateItemCount(count: number) {
    this.itemCount = count > 0 ? count : 0;
  }

  goToCart() {
    console.log(' go to cart ');
  }
}
