import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: false,
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];

  searchOrderNumber: string = '';
  searchProductName: string = '';
  fromDate: string = '';
  toDate: string = '';
  userId!: number;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const paramValue = this.route.snapshot.paramMap.get('id');
    this.userId = Number(paramValue);

    if (!this.userId) {
      console.error('No userId found in route!');
      return;
    }

    this.orderService.getOrdersByUser(this.userId).subscribe({
      next: (data) => {
        this.orders = data.map((order: any) => {
          const itemDetails = order.orderItems?.map(
            (item: any) => `${item.productName} (x${item.quantity})`
          ) || [];

          return {
            ...order,
            itemDetails,
            totalAmount: order.totalAmount 
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
    this.filteredOrders = this.orders.filter((order) => {
      const matchesOrderNumber = this.searchOrderNumber
        ? order.identifier?.toString().toLowerCase().includes(this.searchOrderNumber.toLowerCase())
        : true;

      const matchesProduct = this.searchProductName
        ? order.orderItems?.some((item: any) =>
            item.productName?.toLowerCase().includes(this.searchProductName.toLowerCase())
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
