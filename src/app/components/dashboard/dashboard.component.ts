import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cards: any[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.cards = products.map((product:Product) => ({
        title: product.title,
        cols: 1,
        rows: 1,
        product: product
      }))
    })
  }
  getCardImage(card: any): string {
    return card.product && card.product.image;
  }

}
