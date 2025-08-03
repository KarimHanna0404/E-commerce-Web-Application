import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Menubar} from "primeng/menubar";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menubar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'frontend';
  model: MenuItem[] | undefined;

  ngOnInit(): void {
    this.model = [
      {
        label: "Home",
        routerLink: ["/"],
        icon: 'pi pi-home',
      }];
    const styleTag = document.querySelector('[data-primeng-style-id="global-variables"]');
    console.log('Active theme CSS:', styleTag?.textContent?.slice(0, 500));
  }

}
