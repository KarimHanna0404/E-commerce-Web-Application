import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: false,
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];

  searchOrderNumber: string = '';
  searchProductName: string = '';
  fromDate: string = '';
  toDate: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        // Map itemDetails for display
        this.orders = data.map(order => {
          const itemDetails = order.orderItems?.map(
            item => `${item.productDto.name} (x${item.quantity})`
          ) || [];

          return {
            ...order,
            itemDetails
          };
        });

        this.orders.sort(
          (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );

        this.filteredOrders = [...this.orders];
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      },
    });
  }

  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesOrderNumber = this.searchOrderNumber
        ? order.identifier?.toLowerCase().includes(this.searchOrderNumber.toLowerCase())
        : true;

      const matchesProduct = this.searchProductName
        ? order.orderItems?.some(item =>
            item.productDto.name?.toLowerCase().includes(this.searchProductName.toLowerCase())
          )
        : true;

      const orderDate = new Date(order.orderDate);
      const matchesFromDate = this.fromDate ? orderDate >= new Date(this.fromDate) : true;
      const matchesToDate = this.toDate ? orderDate <= new Date(this.toDate) : true;

      return matchesOrderNumber && matchesProduct && matchesFromDate && matchesToDate;
    });
  }

  resetFilters(): void {
    this.searchOrderNumber = '';
    this.searchProductName = '';
    this.fromDate = '';
    this.toDate = '';
    this.filteredOrders = [...this.orders];
  }
}
