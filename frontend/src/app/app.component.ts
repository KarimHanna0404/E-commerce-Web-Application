import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { CartService } from './services/cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  showMenu = false;
  title = 'frontend';
  model: MenuItem[] = [];
  cartCount = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
        this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });

    
  this.model = [
    { label: 'Homepage', icon: 'pi pi-home', routerLink: '/homepage' },
    { label: 'Cart', icon: 'pi pi-shopping-cart', routerLink: '/cart' },
    { label: 'orders', icon: 'pi pi-history', routerLink: 'orders/:id' },
  ];
  
const setMenuVisibility = (url: string) => {
  this.showMenu = !(url.startsWith('/login') || url.startsWith('/register'));
};


    setMenuVisibility(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => setMenuVisibility(e.urlAfterRedirects));

    const styleTag = document.querySelector('[data-primeng-style-id="global-variables"]');
    console.log('Active theme CSS:', styleTag?.textContent?.slice(0, 500));
  }

    goToCart() {
    this.router.navigate(['/cart']);
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();

    this.router.navigate(['/login']);
  }
}
