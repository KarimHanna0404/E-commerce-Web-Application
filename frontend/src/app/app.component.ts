import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  showMenu = false;
  title = 'frontend';
  model: MenuItem[] = [];
  cartCount = 0;
  constructor(private cartService: CartService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });

    this.model = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/homepage' },
      { label: 'Cart', icon: 'pi pi-shopping-cart', routerLink: '/cart' },
      { label: 'Orders', icon: 'pi pi-history', routerLink: '/orders' },
    ];

    const setMenuVisibility = (url: string) => {
      this.showMenu = !(
        url.startsWith('/login') || url.startsWith('/register')
      );
    };

    setMenuVisibility(this.router.url);

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => setMenuVisibility(e.urlAfterRedirects));

    const styleTag = document.querySelector(
      '[data-primeng-style-id="global-variables"]'
    );
    console.log('Active theme CSS:', styleTag?.textContent?.slice(0, 500));
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  logout() {
    this.http.post<void>('http://localhost:8080/api/auth/logout', {}, { withCredentials: true })
      .subscribe({
        next: () => {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/login']);
        },
        error: () => {
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      });
  }
}
