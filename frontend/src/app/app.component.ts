import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.model = [
      { label: 'Homepage', icon: 'pi pi-home', routerLink: '/homepage' },
    ];

    const setMenuVisibility = (url: string) => {
      this.showMenu = url.startsWith('/homepage');
    };

    setMenuVisibility(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => setMenuVisibility(e.urlAfterRedirects));

    const styleTag = document.querySelector('[data-primeng-style-id="global-variables"]');
    console.log('Active theme CSS:', styleTag?.textContent?.slice(0, 500));
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
  
    this.router.navigate(['/login']);
  }
}